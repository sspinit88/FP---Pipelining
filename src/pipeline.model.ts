/*
  When we pipeline several functions, a function’s output type should be 
  the same as the following function’s parameter type. 
  Let’s have an auxiliary FnsMatchPipe<> type to check whether two types satisfy this condition:
*/

export type FN = (...args: any[]) => any;

export type FnsMatchPipe<FNS extends FN[]> = 1 extends FNS['length']
  ? boolean
  : FNS extends [
      infer FN1st extends FN,
      infer FN2nd extends FN,
      ...infer FNRest extends FN[]
    ]
  ? Parameters<FN2nd> extends [ReturnType<FN1st>]
    ? FnsMatchPipe<[FN2nd, ...FNRest]>
    : never
  : never;

/*
  This works recursively. 
  If we have a single function in the pipeline (the length of FNS is 1), 
  then we return boolean to signify success. 
  
  If we have more than one function, we take the first and second functions, check that the parameter of the 
  latter is the same type as the return type of the former, and apply recursion to check types from the second
  function onward. If there’s no match in types, we return never to mark a failure.
*/

export type Pipeline<FNS extends FN[]> = boolean extends FnsMatchPipe<FNS>
  ? 1 extends FNS['length']
    ? FNS[0]
    : FNS extends [infer FNFIRST extends FN, ...FN[], infer FNLAST extends FN]
    ? (...args: Parameters<FNFIRST>) => ReturnType<FNLAST>
    : never
  : never;

/*
    We first verify that the function’s types are correct, using FnsMatchPipe<>. 
    If the types match, the type of the whole pipeline is that of a function that gets 
    arguments of the same type as the first function in the pipeline and returns a value 
    of the same type as the last pipelined function.
*/
