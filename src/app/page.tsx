'use client';

import Button from '../components/Button';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">実験へのご協力のお願い</h1>
        <p className="text-gray-700 leading-relaxed">
          この実験は、ブログカードのデザインが記憶に与える影響を調べることを目的としています。
          以下の注意事項をよく読み、ご同意いただける方のみ次に進んでください。
        </p>
        <ul className="text-gray-700 list-disc text-left pl-6 space-y-2">
          <li>実験では、16枚の異なるブログカードをスマートフォンで順に閲覧していただきます。</li>
          <li>カードは1枚あたり16秒間表示され、自動で次のカードに遷移します。</li>
          <li>
            内容はすべて独自に作成した造語です。これらの造語は現存する言葉や実在の物と一切関係がなく、完全に架空の名称として設計されています。
          </li>
          <li>実験中は画面に集中し、記憶する意識を持って閲覧してください。</li>
          <li>実験終了後、表示されたカードに関する再認テストを行います。</li>
          <li>この実験では、回答者の年代・性別・回答結果が匿名で保存されます。</li>
        </ul>
        <p className="text-gray-700 leading-relaxed pt-2">
          上記の内容に同意いただける場合は、「はじめる」ボタンを押して進んでください。
        </p>
        <div className="pt-4">
          <Button onClick={() => router.push('/start')}>はじめる</Button>
        </div>
      </div>
    </div>
  );
}
