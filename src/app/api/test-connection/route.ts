import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SUPABASE_URL" },
        { status: 500 }
      );
    }

    if (!supabaseAnonKey) {
      return NextResponse.json(
        { error: "Missing NEXT_PUBLIC_SUPABASE_ANON_KEY" },
        { status: 500 }
      );
    }

    if (!serviceRoleKey) {
      return NextResponse.json(
        { error: "Missing SUPABASE_SERVICE_ROLE_KEY" },
        { status: 500 }
      );
    }

    // Test connection with anon key
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test basic query
    const { data: burgers, error: queryError } = await supabase
      .from("burgers")
      .select("count")
      .limit(1);

    if (queryError) {
      return NextResponse.json(
        {
          error: "Database query failed",
          details: queryError.message,
          code: queryError.code,
        },
        { status: 500 }
      );
    }

    // Test service role key
    const supabaseService = createClient(supabaseUrl, serviceRoleKey);

    const { data: serviceData, error: serviceError } = await supabaseService
      .from("burgers")
      .select("count")
      .limit(1);

    if (serviceError) {
      return NextResponse.json(
        {
          error: "Service role connection failed",
          details: serviceError.message,
          code: serviceError.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Supabase connection working",
      anonKeyWorking: true,
      serviceKeyWorking: true,
      burgerCount: burgers?.length || 0,
    });
  } catch (error) {
    console.error("Connection test error:", error);
    return NextResponse.json(
      {
        error: "Connection test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
