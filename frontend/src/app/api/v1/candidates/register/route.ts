import { NextResponse } from 'next/server';
import { calcularCompletitudPerfil, Candidato } from '@/lib/types';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validaciones mínimas de RN13 y campos obligatorios
    if (!body.consentimiento_terminos || !body.consentimiento_privacidad) {
      return NextResponse.json(
        { error: 'Debe aceptar los Términos y la Política de Privacidad (RN13).' },
        { status: 400 }
      );
    }

    if (!body.nombres || !body.apellidos || !body.email || !body.telefono) {
      return NextResponse.json(
        { error: 'Nombres, apellidos, correo y teléfono son obligatorios.' },
        { status: 400 }
      );
    }

    if (!body.distrito_id || !body.zonas_aceptadas || body.zonas_aceptadas.length === 0) {
      return NextResponse.json(
        { error: 'Debe indicar su distrito y al menos una zona aceptada.' },
        { status: 400 }
      );
    }

    // Cálculo oficial de completitud (RN10: CV opcional)
    const completitud = calcularCompletitudPerfil({
      nombres: body.nombres,
      apellidos: body.apellidos,
      distrito_id: body.distrito_id,
      zonas_aceptadas: body.zonas_aceptadas,
      tiempo_max_traslado_min: body.tiempo_max_traslado_min || 45,
      fecha_disponible: body.fecha_disponible || new Date().toISOString().split('T')[0],
      horarios_disponibles: {
        dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        franjas: body.franjas_horarias || ['manana', 'tarde'],
      },
      tipo_jornada: body.tipo_jornada || 'completa',
      rubros_interes: body.rubros_interes || [],
      habilidades: body.habilidades || [],
      sin_experiencia: body.sin_experiencia ?? true,
      experiencia_meses: body.sin_experiencia ? 0 : (body.experiencia_meses || 0),
      nivel_educativo: body.nivel_educativo || 'Secundaria completa',
      cv_nombre: body.cv_nombre,
      cv_url: body.cv_url,
    });

    const timestampLima = new Date().toISOString();
    const candidateId = 'cand-' + Date.now();
    const usuarioId = 'usr-' + Date.now();

    const candidato: Candidato = {
      id: candidateId,
      usuario_id: usuarioId,
      nombres: body.nombres.trim(),
      apellidos: body.apellidos.trim(),
      distrito_id: body.distrito_id,
      zonas_aceptadas: body.zonas_aceptadas,
      tiempo_max_traslado_min: body.tiempo_max_traslado_min || 45,
      fecha_disponible: body.fecha_disponible || new Date().toISOString().split('T')[0],
      horarios_disponibles: {
        dias: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
        franjas: body.franjas_horarias || ['manana', 'tarde'],
      },
      tipo_jornada: body.tipo_jornada || 'completa',
      rubros_interes: body.rubros_interes || [],
      habilidades: body.habilidades || [],
      sin_experiencia: body.sin_experiencia ?? true,
      experiencia_meses: body.sin_experiencia ? 0 : (body.experiencia_meses || 0),
      nivel_educativo: body.nivel_educativo || 'Secundaria completa',
      cv_nombre: body.cv_nombre,
      cv_url: body.cv_url,
      completitud_pct: completitud,
      activo: true,
      creado_en: timestampLima,
      actualizado_en: timestampLima,
    };

    return NextResponse.json({
      status: 'success',
      message: 'Candidato registrado exitosamente con perfil express.',
      data: {
        candidato,
        completitud_pct: completitud,
        cv_incluido: Boolean(body.cv_nombre || body.cv_url),
      },
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json(
      { error: 'Error procesando registro: ' + error.message },
      { status: 500 }
    );
  }
}
