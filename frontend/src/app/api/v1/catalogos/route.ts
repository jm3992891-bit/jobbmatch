import { NextResponse } from 'next/server';
import { DISTRITOS_LIMA, ZONAS_LIMA, RUBROS_LABORA, HABILIDADES_LABORA } from '@/lib/catalogos';

export async function GET() {
  return NextResponse.json({
    status: 'success',
    data: {
      distritos: DISTRITOS_LIMA,
      zonas: ZONAS_LIMA,
      rubros: RUBROS_LABORA,
      habilidades: HABILIDADES_LABORA,
    },
  });
}
