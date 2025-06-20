'use client'

import React, { useEffect, useState } from 'react'
import { Question, Card } from '@/types'
import { saveCardsAndAnswers } from '../../utils/saveCardAndAnswers'

function shuffle<T>(array: T[]): T[] {
  const copied = [...array]
  for (let i = copied.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copied[i], copied[j]] = [copied[j], copied[i]]
  }
  return copied
}

function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = shuffle(array)
  return shuffled.slice(0, count)
}

export default function RecognitionPage() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<(string | null)[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    const stored = sessionStorage.getItem('experimentCards')
    if (!stored) return

    const cards: Card[] = JSON.parse(stored)
    const selected = getRandomItems(cards, 12)

    const allWords = cards.map(c => c.word)

    const generatedQuestions: Question[] = selected.map(card => {
      const distractors = getRandomItems(
        allWords.filter(w => w !== card.word),
        3
      )
      const options = shuffle([card.word!, ...distractors.filter((w): w is string => typeof w === 'string')])
      return {
        question: card.question!,
        word: card.word!,
        options,
      }
    })

    setQuestions(generatedQuestions)
    setAnswers(Array(generatedQuestions.length).fill(null))
    const questionsString = JSON.stringify(generatedQuestions)
    sessionStorage.setItem('recognitionQuestions', questionsString)
  }, [])

  const handleAnswer = (index: number, title: string) => {
    const updated = [...answers]
    updated[index] = title
    setAnswers(updated)
  }

  useEffect(() => {
    if (currentQuestionIndex >= questions.length) {
      if (questions.length === answers.length && answers.every(ans => ans !== null)) {
        const participantId = sessionStorage.getItem('participantId')
        const experimentCards = sessionStorage.getItem('experimentCards')
        if (!participantId || !experimentCards) return

        const cardMeta = JSON.parse(experimentCards)

        const payload = questions.map((q, idx) => {
          const meta = cardMeta.find((m: any) => m.question === q.question)
          return {
            title: meta?.title || '',
            chunkType: meta?.chunkType || '',
            fontSize: meta?.fontSize || '',
            imagePosition: meta?.imagePosition || '',
            question: q.question,
            word: q.word,
            selected: answers[idx] ?? '',
          }
        })

        saveCardsAndAnswers(participantId, payload)
      }
    }
  }, [currentQuestionIndex, questions, answers])

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      <h1 className="text-xl font-bold mb-6 text-gray-900">再認テスト</h1>
      <p className="text-gray-700 mb-4">当てはまる単語を選択してください。</p>
      {currentQuestionIndex < questions.length ? (
        <div
          key={currentQuestionIndex}
          className="w-full max-w-xl bg-white border border-gray-200 rounded-lg shadow-md p-6 transition-all duration-500 ease-in-out opacity-100"
        >
          <p className="mb-4 text-gray-900 font-medium text-lg">
            {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </p>
          <div className="grid grid-cols-1 gap-3 mb-6">
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <button
                key={`${currentQuestionIndex}-${idx}`}
                onClick={() => handleAnswer(currentQuestionIndex, option)}
                className={`w-full px-4 py-3 text-left border rounded-lg transition-colors ${
                  answers[currentQuestionIndex] === option
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-50 text-gray-900 hover:bg-blue-100'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
            disabled={answers[currentQuestionIndex] === null}
            className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-semibold disabled:opacity-50 transition"
          >
            次へ
          </button>
        </div>
      ) : (
        <div className="text-center text-gray-900 mt-10">
          <p className="text-lg font-semibold mb-4">テストは終了しました。</p>
          <p className="text-sm">ご協力ありがとうございました。</p>
        </div>
      )}
    </div>
  )
}
