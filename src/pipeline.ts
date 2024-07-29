import { FN } from './pipeline.model.ts';

const pipeTwoline =
  <AR extends any[], FR, SR>(
    firstFn: (...args: AR) => FR,
    secondFn: (arg: FR) => SR
  ) =>
  (...args: any[]) =>
    secondFn(firstFn(...args));

const pipelineСlosures = (...fns: any[]) => {
  return (...args: any[]) => {
    let result = fns[0](...args);
    for (let i = 1; i < fns.length; i++) {
      result = fns[i](result);
    }
    return result;
  };
};

const pipelineReduce = <FNS extends FN[]>(...fns: FNS) => {
  return fns.reduce(
    (prevFn, nextFn) =>
      (...args: FNS) =>
        nextFn(prevFn(...args))
  ); /// reducer
};

const pipelineReduceWithTwolines = (...fns: any[]) => {
  return fns.reduce(pipeTwoline);
};

/// тут не доделал
// const pipelineTSReduce = <FNS extends FN[]>(...fns: FNS): Pipeline<FNS> => {
//   return <Pipeline<FNS>>fns.reduce(
//     (result, func) =>
//       (...args: FNS) =>
//         func(result(...args))
//   );
// };

export {
  pipeTwoline,
  pipelineСlosures,
  pipelineReduce,
  pipelineReduceWithTwolines,
  // pipelineTSReduce,
};
