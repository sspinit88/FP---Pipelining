import { pipelineReduce } from './pipeline.ts';

const add = (a: number, b: number) => a + b;
const square = (x: number) => x * x;
const half = (x: number) => x / 2;

const test = pipelineReduce(add, square, half);

console.log('result:', test(2, 5));
