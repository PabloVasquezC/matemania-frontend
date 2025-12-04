#!/bin/bash

# Script mejorado para convertir la Matriz de Cobertura usando Pandoc
# Requiere: Pandoc instalado

MARKDOWN_FILE="tests/MATRIZ_COBERTURA_PRUEBAS.md"
OUTPUT_DIR="tests/exports"

# Crear directorio de salida si no existe
mkdir -p "$OUTPUT_DIR"

# Verificar si Pandoc está instalado
if ! command -v pandoc &> /dev/null; then
    echo "❌ Pandoc no está instalado."
    echo "📖 Por favor, consulta tests/INSTALL_PANDOC.md para instrucciones de instalación."
    echo ""
    echo "Instalación rápida:"
    echo "  sudo apt install -y pandoc"
    exit 1
fi

echo "🔄 Convirtiendo Matriz de Cobertura de Pruebas usando Pandoc..."
echo "📦 Versión de Pandoc: $(pandoc --version | head -n 1)"
echo ""

# Convertir a DOCX (Word) con Pandoc
echo "📝 Generando DOCX (Word) con Pandoc..."
pandoc "$MARKDOWN_FILE" -o "$OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.docx" \
    --standalone \
    --toc \
    --metadata title="Matriz de Cobertura de Pruebas - Matemanía"
if [ $? -eq 0 ]; then
    echo "✅ DOCX generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.docx"
else
    echo "❌ Error al generar DOCX"
fi

# Convertir a HTML
echo "🌐 Generando HTML..."
pandoc "$MARKDOWN_FILE" -o "$OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.html" \
    --standalone \
    --toc \
    --css=https://cdn.jsdelivr.net/npm/github-markdown-css@5.5.0/github-markdown.min.css \
    --metadata title="Matriz de Cobertura de Pruebas - Matemanía"
if [ $? -eq 0 ]; then
    echo "✅ HTML generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.html"
else
    echo "❌ Error al generar HTML"
fi

# Convertir a PDF (requiere LaTeX)
echo "📄 Generando PDF..."
if command -v xelatex &> /dev/null || command -v pdflatex &> /dev/null; then
    pandoc "$MARKDOWN_FILE" -o "$OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.pdf" \
        --pdf-engine=xelatex \
        --toc \
        --metadata title="Matriz de Cobertura de Pruebas - Matemanía" \
        -V geometry:margin=1in \
        2>/dev/null
    if [ $? -eq 0 ]; then
        echo "✅ PDF generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.pdf"
    else
        echo "⚠️  Error al generar PDF (puede requerir LaTeX instalado)"
        echo "    Para instalar LaTeX: sudo apt install texlive-latex-base texlive-fonts-recommended"
    fi
else
    echo "⚠️  LaTeX no encontrado, omitiendo generación de PDF"
    echo "    Para instalar: sudo apt install texlive-latex-base texlive-fonts-recommended"
fi

# Convertir a ODT (OpenDocument)
echo "📋 Generando ODT (OpenDocument)..."
pandoc "$MARKDOWN_FILE" -o "$OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.odt" \
    --standalone \
    --toc \
    --metadata title="Matriz de Cobertura de Pruebas - Matemanía"
if [ $? -eq 0 ]; then
    echo "✅ ODT generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.odt"
else
    echo "❌ Error al generar ODT"
fi

echo ""
echo "✨ Conversión completada!"
echo "📁 Archivos generados en: $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR/" | grep MATRIZ_COBERTURA_PRUEBAS

echo ""
echo "💡 Para abrir los archivos:"
echo "   PDF:  xdg-open $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.pdf"
echo "   DOCX: xdg-open $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.docx"
echo "   HTML: xdg-open $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.html"
