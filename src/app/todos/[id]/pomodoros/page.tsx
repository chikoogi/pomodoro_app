// 서버 컴포넌트로 변경 가능
import { Suspense } from 'react';
import { PomodoroPageClient } from './PomodoroPageClient';

export default function PomodoroPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main className="container mx-auto px-4 py-8">
        <PomodoroPageClient /> {/* 클라이언트 컴포넌트로 분리 */}
      </main>
    </Suspense>
  );
} 