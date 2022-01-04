# circleci-parallelism-option-test  [![CircleCI](https://circleci.com/gh/yujiosaka/circleci-parallelism-option-test/tree/main.svg?style=svg)](https://circleci.com/gh/yujiosaka/circleci-parallelism-option-test/tree/main)

Testing the behavior of CircleCI parallelism option

## Background

In order to run CircleCI steps in parallel, you need to set a value greater than `1` to the `parallelism` option first.

```yml
version: 2
jobs:
  test:
    docker:
      - image: circleci/node:latest
    parallelism: 3
    ...
```

Then you can use the CircleCI CLI for spliting tests

```bash
circleci tests glob "__test__/*.spec.ts" | circleci tests split --split-by=timing
```

CircleCI advertises that by passing `--split-by=timing` to the `circleci tests split` command, your tests will be split evenly.

> To split by test timings, use the --split-by flag with the timings split type. The available timings data will then be analyzed and your tests will be split across your parallel-running containers as evenly as possible leading to the fastest possible test run time

[Running Tests in Parallel](https://circleci.com/docs/2.0/parallelism-faster-jobs/)

There are many strategies that can be potentially used for splitting tests.

One strong candidate is the [Greedy Algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) but it's not always the most optimized one.

So I decided to run the following tests in order to investigate the CircleCI's behavior.

## Test Plan

I prepared the following tests.

- [delay 20 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-20-seconds.spec.ts)
- [delay 12 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-12-seconds.spec.ts)
- [delay 10 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-10-seconds.spec.ts)
- [delay 8 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-8-seconds.spec.ts)
- [delay 6 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-6-seconds.spec.ts)
- [delay 4 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-4-seconds.spec.ts)

I investigated how these tests are split when the `parallelism` option is set as `3`.

If CircleCI chooses the most optimized strategy, then the tests should complete within 20 seconds.

- **container 1**: [delay 20 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-20-seconds.spec.ts) = `20 secnds`
- **container 2**: [delay 12 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-12-seconds.spec.ts) + [delay 8 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-8-seconds.spec.ts) = `20 seconds`
- **container 3**: [delay 10 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-10-seconds.spec.ts) + [delay 6 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-6-seconds.spec.ts) + [delay 4 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-4-seconds.spec.ts) = `20 seconds`

## Test Result

CircleCI seems to choose the [Greedy Algorithm](https://en.wikipedia.org/wiki/Greedy_algorithm) and it ended up with the following result

- **container 1**: [delay 20 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-20-seconds.spec.ts) = `20 secnds`
- **container 2**: [delay 12 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-12-seconds.spec.ts) +  [delay 6 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-6-seconds.spec.ts) + [delay 4 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-4-seconds.spec.ts) = `22 seconds`
- **container 3**: [delay 10 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-10-seconds.spec.ts) + [delay 8 seconds](https://github.com/yujiosaka/circleci-parallelism-option-test/blob/main/__tests__/delay-8-seconds.spec.ts) = `18 seconds`

### Container 1

<img width="614" alt="Screen Shot 2022-01-05 at 3 38 33" src="https://user-images.githubusercontent.com/2261067/148107607-ebdbba8a-4bce-4d6a-ab36-09282b490047.png">

### Container 2

<img width="907" alt="Screen Shot 2022-01-05 at 3 38 51" src="https://user-images.githubusercontent.com/2261067/148107629-4d850535-fbd2-4e69-b13b-8a73cf5d09e6.png">

### Container 3

<img width="696" alt="Screen Shot 2022-01-05 at 3 39 03" src="https://user-images.githubusercontent.com/2261067/148107643-3c2b88f8-2933-4b6e-a432-db0ee75ebf7b.png">
