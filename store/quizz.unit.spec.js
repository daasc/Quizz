/* eslint-disable import/no-named-as-default-member */
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import { actions, getters, mutations, state } from '@/store/quiz.js'

jest.mock('axios')

const getQuestion = () => {
  return {
    category: 'Entertainment: Video Games',
    type: 'multiple',
    difficulty: 'medium',
    question: 'What is the punishment for playing Postal 2 in New Zealand?',
    correct_answer: '10 years in prison and a fine of $50,000',
    incorrect_answers: [
      'Fine of $5,000',
      'Nothing',
      '15 years in prison and a fine of $10,000',
    ],
  }
}

const getQuestions = () => {
  return [
    getQuestion(),
    {
      category: 'History',
      correct_answer: 'Leif Erikson',
      difficulty: 'medium',
      incorrect_answers: [
        'Christopher Columbus',
        'Amerigo Vespucci',
        'Ferdinand Magellan',
      ],
      question: 'Who was the first explorer to sail to North America?',
      type: 'multiple',
    },
  ]
}

const getAnswers = () => {
  return [true]
}

axios.get = jest
  .fn()
  .mockImplementationOnce(() =>
    Promise.resolve({ data: { results: getQuestion() } })
  )

const storeConfig = {
  state,
  getters,
  mutations,
}

describe('Quiz Store', () => {
  const createStore = () => {
    const localVue = createLocalVue()
    localVue.use(Vuex)

    const store = new Vuex.Store(storeConfig)

    return { store }
  }
  const getQuestion = () => {
    return {
      category: 'Entertainment: Video Games',
      type: 'multiple',
      difficulty: 'medium',
      question: 'What is the punishment for playing Postal 2 in New Zealand?',
      correct_answer: '10 years in prison and a fine of $50,000',
      incorrect_answers: [
        'Fine of $5,000',
        'Nothing',
        '15 years in prison and a fine of $10,000',
      ],
    }
  }
  const getQuiz = ({
    number = 0,
    category = '',
    difficulty = '',
    type = '',
  }) => {
    return {
      amount: number,
      category,
      difficulty,
      type,
    }
  }
  it('should return the value of the quiz', async () => {
    const { store } = await createStore()
    expect(store.state.quiz).toEqual(getQuiz({}))
  })
  it('should return the value of the quiz', async () => {
    const { store } = await createStore()
    expect(store.state.result).toEqual(0)
  })
  it('should return the value of the questions', async () => {
    const { store } = await createStore()
    expect(store.state.questions).toEqual([])
  })
  it('should return the value of the answers', async () => {
    const { store } = await createStore()
    expect(store.state.answers).toEqual([])
  })
  it('should clean questions when CLEAN is called', async () => {
    const { store } = await createStore()
    await store.commit('SET_QUESTIONS', getQuestions())
    await store.commit('CLEAN')
    expect(store.state.questions).toEqual([])
  })
  it('should return the first in the list ', async () => {
    const { store } = await createStore()
    await store.commit('SET_QUESTIONS', getQuestions())
    expect(store.getters.question.category).toEqual(
      'Entertainment: Video Games'
    )
  })
  it('should add data in questions when SET_QUESTIONS is called', async () => {
    const { store } = createStore()
    await store.commit('SET_QUESTIONS', getQuestion())
    expect(store.state.questions).toEqual(getQuestion())
  })

  it('should add data in answers when SET_ANSWERS is called', async () => {
    const { store } = createStore()
    await store.commit('SET_ANSWERS', getAnswers())
    expect(store.state.answers).toEqual([getAnswers()])
  })
  it('should remove the first question from the list and save the rest when next is called', async () => {
    const { store } = createStore()
    await store.commit('SET_QUESTIONS', getQuestions())
    await store.commit('NEXT')
    expect(store.state.questions).toHaveLength(1)
    expect(store.state.questions[0].category).toContain('History')
  })
  it('should add data in quiz when SET_QUIZ is called', async () => {
    const { store } = createStore()
    await store.commit(
      'SET_QUIZ',
      getQuiz({ number: 10, category: '9', difficulty: 'easy', type: 'multi' })
    )
    expect(store.state.quiz).toEqual(
      getQuiz({ number: 10, category: '9', difficulty: 'easy', type: 'multi' })
    )
  })
  it('should return the result of the answers', async () => {
    const { store } = createStore()
    await store.commit('SET_QUESTIONS', [getQuestion()])
    await store.commit('SET_ANSWERS', getAnswers())
    await store.commit('NEXT')
    expect(store.state.result).toBe('100.00')
  })
  it('should return the questions when getQuestion is called', async () => {
    const { store } = createStore()
    await store.commit('SET_QUIZ', getQuiz({ number: 10 }))
    const commit = jest.fn()
    const state = store.state.quiz
    await actions.getQuestions({ commit, state: { quiz: state } })
    expect(commit).toHaveBeenCalledWith('SET_QUESTIONS', getQuestion())
    expect(axios.get).toHaveBeenCalledWith('https://opentdb.com/api.php', {
      params: state,
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})
