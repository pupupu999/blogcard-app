import { supabase } from '../lib/supabaseClient'

export async function saveCardsAndAnswers(
  participantId: string,
  cards: {
    title: string
    chunkType: string
    fontSize: string
    imagePosition: string
    question: string
    word: string
    selected: string
  }[]
) {
  for (const card of cards) {
    const { data: insertedCard, error: insertError } = await supabase
      .from('cards_shown')
      .insert([{
        participant_id: participantId,
        card_title: card.title,
        chunk_type: card.chunkType,
        font_size: card.fontSize,
        image_position: card.imagePosition,
        question: card.question,
        correct_word: card.word,
      }])
      .select()
      .single()

    if (insertError) throw insertError

    await supabase.from('answers').insert([{
      card_shown_id: insertedCard.id,
      selected_word: card.selected,
      is_correct: card.selected === card.word,
    }])
  }
}