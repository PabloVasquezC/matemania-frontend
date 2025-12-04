# Instalación de Pandoc para Conversión de Documentos

## Opción 1: Instalación Manual (Recomendada)

### Instalar Pandoc y dependencias LaTeX

```bash
# Actualizar repositorios
sudo apt update

# Instalar Pandoc
sudo apt install -y pandoc

# Instalar LaTeX (para PDF de alta calidad)
sudo apt install -y texlive-latex-base texlive-fonts-recommended texlive-latex-extra
```

## Opción 2: Instalación Rápida (Solo Pandoc)

Si solo necesitas convertir a DOCX (sin PDF):

```bash
sudo apt install -y pandoc
```

## Opción 3: Usar Pandoc Standalone (Sin sudo)

Descargar versión standalone sin necesidad de sudo:

```bash
# Descargar Pandoc standalone
cd ~/Downloads
wget https://github.com/jgm/pandoc/releases/download/3.1.11/pandoc-3.1.11-linux-amd64.tar.gz

# Extraer
tar xvzf pandoc-3.1.11-linux-amd64.tar.gz

# Mover a directorio local
mkdir -p ~/.local/bin
cp pandoc-3.1.11-linux-amd64/bin/pandoc ~/.local/bin/

# Agregar a PATH (agregar a ~/.bashrc o ~/.zshrc)
export PATH="$HOME/.local/bin:$PATH"

# Verificar instalación
pandoc --version
```

## Verificar Instalación

```bash
# Verificar Pandoc
pandoc --version

# Verificar LaTeX (opcional, para PDF)
pdflatex --version
```

## Uso Después de Instalar

Una vez instalado Pandoc, ejecuta:

```bash
# Usar el script mejorado con Pandoc
./tests/convert-matriz-pandoc.sh
```

O manualmente:

```bash
# Convertir a DOCX (Word)
pandoc tests/MATRIZ_COBERTURA_PRUEBAS.md -o tests/exports/MATRIZ_COBERTURA_PRUEBAS.docx

# Convertir a PDF (requiere LaTeX)
pandoc tests/MATRIZ_COBERTURA_PRUEBAS.md -o tests/exports/MATRIZ_COBERTURA_PRUEBAS.pdf --pdf-engine=xelatex

# Convertir a HTML
pandoc tests/MATRIZ_COBERTURA_PRUEBAS.md -o tests/exports/MATRIZ_COBERTURA_PRUEBAS.html -s
```

## Ventajas de Pandoc

✅ Mejor manejo de tablas Markdown  
✅ Formato más profesional  
✅ Soporte para múltiples formatos  
✅ Mejor preservación de estilos  
✅ Generación de PDFs de alta calidad
