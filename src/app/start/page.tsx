'use client'

import { v4 as uuidv4 } from 'uuid'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '../../components/Button'
import { saveParticipant } from '../../utils/saveParticipant'

export default function StartPage() {
    const router = useRouter()
    const [ageGroup, setAgeGroup] = useState('')
    const [gender, setGender] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const participantId = await saveParticipant(ageGroup, gender)
            sessionStorage.setItem('participantId', participantId)
            router.push('/experiment')
        } catch (error) {
            console.error("参加者の保存に失敗しました:", error)
            alert("参加者情報の送信に失敗しました。もう一度お試しください。")
        }
    }

    return (
        <div className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md space-y-6"
        >
            <h2 className="text-xl font-bold text-gray-800 text-center">年代と性別の選択</h2>

            <div>
            <label className="block text-gray-700 mb-2">あなたの年代を選んでください：</label>
            <select
                value={ageGroup}
                onChange={(e) => setAgeGroup(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                required
            >
                <option value="" disabled>選択してください</option>
                <option value="10代">10代</option>
                <option value="20代">20代</option>
                <option value="30代">30代</option>
                <option value="40代">40代</option>
                <option value="50代">50代</option>
                <option value="60代以上">60代以上</option>
            </select>
            </div>

            <div>
            <label className="block text-gray-700 mb-2">あなたの性別を選んでください：</label>
            <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-900"
                required
            >
                <option value="" disabled>選択してください</option>
                <option value="男性">男性</option>
                <option value="女性">女性</option>
                <option value="回答しない">回答しない</option>
            </select>
            </div>

            <div className="pt-4 text-center">
            <Button type="submit">開始する</Button>
            </div>
        </form>
        </div>
    )
}
