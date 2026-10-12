---
title: 'A Comparative Analysis of Gradient Descent Variants and Their Convergence Behavior'
authors:
  - 'Ömer Faruk Aral'
affiliation: 'Independent Researcher'
abstract: 'This study experimentally compares the convergence behavior of SGD, momentum, and Adam optimization algorithms. Results indicate that adaptive learning-rate methods are more stable in curved regions.'
keywords: ['optimization', 'gradient descent', 'Adam', 'convergence']
date: 2026-08-10
volume: 1
issue: 1
pages: '13–24'
references:
  - 'D. P. Kingma, J. Ba, "Adam: A Method for Stochastic Optimization," <em>ICLR</em>, 2015.'
---

## Introduction

Training deep learning models relies heavily on stochastic gradient descent (SGD) and its variants. In this study, we examine the behavior of three common optimizers.

## Method

For a loss function $L(\theta)$, the basic update rule is:

$$
\theta_{t+1} = \theta_t - \eta \nabla_\theta L(\theta_t)
$$

Adam uses first- and second-moment estimates [1]:

$$
m_t = \beta_1 m_{t-1} + (1 - \beta_1) g_t, \quad
v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2
$$

## Experimental Results

| Algorithm | Final Loss | Epochs to Converge |
| --------- | ---------- | ------------------ |
| SGD | 0.082 | 120 |
| Momentum | 0.045 | 85 |
| Adam | 0.031 | 60 |

## Conclusion

Adaptive methods empirically converge faster, yet careful hyperparameter tuning remains important for generalization performance.
