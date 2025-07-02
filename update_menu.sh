#!/bin/bash

# Directorio base
BASE_DIR="/home/betelcorgi/Documents/GitHub/DeathNoteWiki/Principal"

# Lista de archivos a actualizar
FILES=(
    "Personajes/LightYagami.html"
    "Personajes/misa-amane.html"
    "Personajes/L-Lawliet.html"
    "Personajes/Mello.html"
    "Personajes/Near.html"
    "Personajes/PersonajesSecundarios.html"
    "Musica-multimedia/index.html"
    "Ideologia/index.html"
    "Datos/index.html"
)

# Crear respaldo del directorio
BACKUP_DIR="$BASE_DIR/backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$BASE_DIR/Personajes" "$BACKUP_DIR/"
cp -r "$BASE_DIR/Musica-multimedia" "$BACKUP_DIR/"
cp -r "$BASE_DIR/Ideologia" "$BACKUP_DIR/"
cp -r "$BASE_DIR/Datos" "$BACKUP_DIR/"

echo "Se ha creado una copia de seguridad en: $BACKUP_DIR"

# Función para actualizar un archivo HTML
update_file() {
    local file="$1"
    local full_path="$BASE_DIR/$file"
    
    echo "Actualizando $full_path..."
    
    # Verificar si el archivo existe
    if [ ! -f "$full_path" ]; then
        echo "  - No se encontró el archivo, omitiendo..."
        return
    fi
    
    # Verificar si ya tiene el botón de hamburguesa
    if grep -q 'class="burger"' "$full_path"; then
        echo "  - Ya tiene el menú hamburguesa, omitiendo..."
        return
    fi
    
    # Crear archivo temporal
    local temp_file="${full_path}.tmp"
    
    # Insertar el botón de hamburguesa antes del botón Ver
    sed -i '/<a.*ver-btn/i \    <div class="burger">\n       <span class="barra-hamburguesa"> </span>\n       <span class="barra-hamburguesa"> </span>\n       <span class="barra-hamburguesa"> </span>\n    </div>\n' "$full_path"
    
    # Agregar el script navbarHamburger.js antes de cerrar el body
    if ! grep -q 'navbarHamburger.js' "$full_path"; then
        sed -i '/<\/body>/i <script src="../assets/JS/navbarHamburger.js"></script>' "$full_path"
    fi
    
    echo "  - Actualización completada."
}

# Actualizar cada archivo
for file in "${FILES[@]}"; do
    update_file "$file"
done

echo "¡Proceso completado!"
echo "Verifica los cambios en los archivos antes de hacer commit."
