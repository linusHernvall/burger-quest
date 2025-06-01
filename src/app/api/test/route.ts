import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("burgers")
      .insert({
        burger_name: "Cheeseburger",
        restaurant: "McDonalds",
        rating: 3,
        image_url: "https://example.com/cheeseburger.jpg",
        content: "This is a test content",
      })
      .select();

    if (error) throw error;

    return NextResponse.json({
      data,
      message: "Successfully connected to Supabase!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to connect to Supabase" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const { data, error } = await supabase.from("burgers").select();

    if (error) throw error;

    return NextResponse.json({
      data,
      message: "Successfully inserted a test burger!",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to insert test burger" },
      { status: 500 }
    );
  }
}
