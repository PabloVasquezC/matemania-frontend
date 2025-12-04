#!/bin/bash

# Script para convertir la Matriz de Cobertura a diferentes formatos
# Requiere: LibreOffice instalado

MARKDOWN_FILE="tests/MATRIZ_COBERTURA_PRUEBAS.md"
OUTPUT_DIR="tests/exports"

# Crear directorio de salida si no existe
mkdir -p "$OUTPUT_DIR"

echo "🔄 Convirtiendo Matriz de Cobertura de Pruebas a diferentes formatos..."
echo ""

# Convertir a PDF
echo "📄 Generando PDF..."
libreoffice --headless --convert-to pdf --outdir "$OUTPUT_DIR" "$MARKDOWN_FILE" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ PDF generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.pdf"
else
    echo "❌ Error al generar PDF"
fi

# Convertir a DOCX (Word)
echo "📝 Generando DOCX (Word)..."
libreoffice --headless --convert-to docx --outdir "$OUTPUT_DIR" "$MARKDOWN_FILE" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ DOCX generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.docx"
else
    echo "❌ Error al generar DOCX"
fi

# Convertir a ODT (OpenDocument)
echo "📋 Generando ODT (OpenDocument)..."
libreoffice --headless --convert-to odt --outdir "$OUTPUT_DIR" "$MARKDOWN_FILE" 2>/dev/null
if [ $? -eq 0 ]; then
    echo "✅ ODT generado: $OUTPUT_DIR/MATRIZ_COBERTURA_PRUEBAS.odt"
else
    echo "❌ Error al generar ODT"
fi

echo ""
echo "✨ Conversión completada!"
echo "📁 Archivos generados en: $OUTPUT_DIR/"
ls -lh "$OUTPUT_DIR/"
