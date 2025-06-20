import { supabase } from '../lib/supabaseClient'

export async function saveParticipant(ageGroup: string, gender: string) {
  const { data, error } = await supabase
    .from('participants')
    .insert([{ age_group: ageGroup, gender }])
    .select()
    .single()

  if (error) throw error
  return data.id as string
}