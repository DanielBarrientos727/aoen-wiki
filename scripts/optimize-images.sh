#!/usr/bin/env bash
set -Eeuo pipefail

BASE_URL="https://image.weversejapan.com/official/live/aoen/contents/profile/6"
OUT_DIR="public/img"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Falta cwebp. En Fedora instala el codificador WebP con:" >&2
  echo "  sudo dnf install libwebp-tools" >&2
  exit 1
fi

mkdir -p "$OUT_DIR"

# Evita descargas repetidas si ya existen las versiones optimizadas.
expected=(
  hero-640.webp hero-960.webp
  yuju-320.webp yuju-640.webp
  ruka-320.webp ruka-640.webp
  gaku-320.webp gaku-640.webp
  hikaru-320.webp hikaru-640.webp
  sota-320.webp sota-640.webp
  kyosuke-320.webp kyosuke-640.webp
  reo-320.webp reo-640.webp
)
complete=true
for file in "${expected[@]}"; do
  if [[ ! -s "$OUT_DIR/$file" ]]; then complete=false; break; fi
done
if [[ "$complete" == true ]]; then
  echo "Las 16 imágenes WebP locales ya están preparadas."
  exit 0
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "$TMP_DIR"' EXIT

download_photo() {
  local file="$1"
  local output="$2"
  local url="$BASE_URL/$file"
  echo "Descargando foto oficial: $file"
  curl --fail --location --silent --show-error \
    --retry 3 --connect-timeout 15 --max-time 90 \
    --user-agent "Mozilla/5.0 (compatible; aoen-wiki image optimizer)" \
    --referer "https://aoen-official.jp/" \
    "$url" -o "$output"
  if [[ ! -s "$output" ]]; then
    echo "La descarga quedó vacía: $url" >&2
    exit 1
  fi
}

convert_webp() {
  local input="$1"
  local output="$2"
  local width="$3"
  local quality="$4"
  cwebp -quiet -mt -resize "$width" 0 -q "$quality" "$input" -o "$output"
}

download_photo "4ec9653774974af180aadd0270313c48.jpg" "$TMP_DIR/hero.jpg"
convert_webp "$TMP_DIR/hero.jpg" "$OUT_DIR/hero-640.webp" 640 76
convert_webp "$TMP_DIR/hero.jpg" "$OUT_DIR/hero-960.webp" 960 80

while IFS=' ' read -r name filename; do
  [[ -n "$name" ]] || continue
  download_photo "$filename" "$TMP_DIR/$name.jpg"
  convert_webp "$TMP_DIR/$name.jpg" "$OUT_DIR/$name-320.webp" 320 74
  convert_webp "$TMP_DIR/$name.jpg" "$OUT_DIR/$name-640.webp" 640 78
done <<'PHOTOS'
yuju 864aa96af0444634bfe710b80c4fc87c.jpg
ruka 5d563edf2875491d84af81f923c456fa.jpg
gaku 132b1fbd3ec8459fae8f0e5bd804217c.jpg
hikaru 4540976fa6714d30b19e465e0b299cc5.jpg
sota cad693a3915343ed92f53848817abbc1.jpg
kyosuke 616ef1d0a06d455196f2bf949d970129.jpg
reo d3516c4f8d97455e9197e3906f36cff8.jpg
PHOTOS

echo "Listo: WebP locales preparadas en $OUT_DIR."
du -h "$OUT_DIR"/*.webp
