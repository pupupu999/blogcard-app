'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import CardView from '../../components/CardView'
import Button from '../../components/Button'
import cardChunk4 from '../../data/cardChunk4.json'
import cardChunk7 from '../../data/cardChunk7.json'
import cardChunk10 from '../../data/cardChunk10.json'

// ヘルパー関数：ランダムに配列から指定数選ぶ
function getRandomItems(array: any[], count: number) {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

// 組み合わせの全パターン（3チャンク × 2フォントサイズ × 2画像位置）
const chunkTypes = [
  { type: '4', data: cardChunk4 },
  { type: '7', data: cardChunk7 },
  { type: '10', data: cardChunk10 },
]
const fontSizes = ['9pt', '12pt']
const imagePositions = ['left', 'right']

// 組み合わせ作成
let allCombinations: any[] = []
chunkTypes.forEach(({ type, data }) => {
  fontSizes.forEach((fontSize) => {
    imagePositions.forEach((position) => {
      allCombinations.push({ chunkType: type, data, fontSize, imagePosition: position })
    })
  })
})

// 各組み合わせごとにランダムなカードを1つ選ぶ（重複を避ける）
const usedTitles = new Set<string>()
const selectedCards: any[] = []

for (const { chunkType, data, fontSize, imagePosition } of allCombinations) {
  const availableCards = data.filter((card: any) => !usedTitles.has(card.title))
  if (availableCards.length === 0) continue
  const randomCard = getRandomItems(availableCards, 1)[0]
  usedTitles.add(randomCard.title)
  selectedCards.push({
    ...randomCard,
    fontSize: fontSize === '9pt' ? 'text-9pt' : 'text-12pt',
    fontSizeRaw: fontSize,
    imagePosition,
    imagePositionRaw: imagePosition,
    chunkType,
  })
}

// 不足分を全カードから重複しないよう追加
const allCards = [...cardChunk4, ...cardChunk7, ...cardChunk10]
while (selectedCards.length < 16) {
  const remaining = allCards.filter((card: any) => !usedTitles.has(card.title))
  if (remaining.length === 0) break
  const extraCard = getRandomItems(remaining, 1)[0]
  usedTitles.add(extraCard.title)

  // Determine which chunk it came from
  let chunkType = 'extra'
  if (cardChunk4.includes(extraCard)) chunkType = '4'
  else if (cardChunk7.includes(extraCard)) chunkType = '7'
  else if (cardChunk10.includes(extraCard)) chunkType = '10'

  selectedCards.push({
    ...extraCard,
    fontSize: Math.random() < 0.5 ? 'text-9pt' : 'text-12pt',
    fontSizeRaw: Math.random() < 0.5 ? '9pt' : '12pt',
    imagePosition: Math.random() < 0.5 ? 'left' : 'right',
    imagePositionRaw: Math.random() < 0.5 ? 'left' : 'right',
    chunkType,
  })
}

console.log('selectedCards.length before slicing:', selectedCards.length)

// 最終的な表示カードリスト（最大16枚に調整してシャッフル）
const cards = selectedCards.sort(() => 0.5 - Math.random()).slice(0, 16)

console.log(cards.length)

export default function Experiment() {
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loggableCards = cards.map(({ title, chunkType, fontSizeRaw, imagePositionRaw, word, question }) => ({
      title,
      chunkType,
      fontSize: fontSizeRaw,
      imagePosition: imagePositionRaw,
      word,
      question,
    }))
    sessionStorage.setItem('experimentCards', JSON.stringify(loggableCards))
  }, [])

  useEffect(() => {
    if (index >= 16) return

    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1))
        setFade(true)
      }, 1000)
    }, 16000)

    return () => clearInterval(interval)
  }, [index])

  const showTestButton = index >= 16

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center mb-6">
        {!showTestButton ? (
          <>
            <p className="text-lg font-semibold mb-2 text-gray-900">以下のカードをよく見て、できるだけ記憶してください。</p>
            <p className="text-sm text-gray-600">16秒後に自動的に次のカードが表示されます</p>
          </>
        ) : (
          <>
            <p className="text-lg font-semibold mb-4 text-gray-900">カードは以上になります。次にテストを行ってください。</p>
            <Button onClick={() => router.push('/recognition')}>
              テストを行う
            </Button>
          </>
        )}
      </div>

      {!showTestButton && cards[index] && (
        <div className={`transition-opacity duration-1000 ${fade ? 'opacity-100' : 'opacity-0'}`}>
          <CardView
            title={cards[index].title}
            description={cards[index].description}
            imageUrl={cards[index].imageUrl}
            imagePosition={cards[index].imagePosition}
            fontSize={cards[index].fontSize}
          />
        </div>
      )}
    </div>
  )
}