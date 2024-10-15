import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient()
    
    const { searchParams } = new URL(req.url)
    const user_id = searchParams.get('user_id')
    
    if (!user_id) {
      return NextResponse.json({ error: 'Missing user_id parameter' }, { status: 400 })
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user_id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }
    const {id,...newUser} = user
    
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('Error in GET request:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}