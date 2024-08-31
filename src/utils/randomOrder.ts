function createRandomOrder(targetLength: number): number[] {
  const sequence = Array.from({ length: targetLength }, (_, i) => i);
  const shuffleSequence = sequence.sort(() => Math.random() - 0.5);

  return shuffleSequence;
}

export default createRandomOrder;
