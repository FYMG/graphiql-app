import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function POST(req: NextRequest) {
  const { method, url, headers, body } = await req.json();

  try {
    const response = await axios({
      method,
      url,
      headers,
      data: body,
    });

    return NextResponse.json({
      status: response.status,
      data: response.data,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return NextResponse.json(
        {
          message: error.message,
          ...(error.response
            ? { status: error.response.status, data: error.response.data }
            : {}),
        },
        { status: error.response ? error.response.status : 500 }
      );
    }
  }
}
