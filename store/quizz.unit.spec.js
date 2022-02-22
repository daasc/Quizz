import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import axios from 'axios'
import { actions, getters, mutations, state } from '@/store/quizz.js'

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

describe('Quizz Store', () => {
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
  const getQuizz = ({
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
    expect(store.state.quizz).toEqual(getQuizz({}))
  })

  it('should return the value of the questions', async () => {
    const { store } = await createStore()
    expect(store.state.questions).toEqual([])
  })

  it('should add data in questions when SET_QUESTIONS is called', async () => {
    const { store } = createStore()
    await store.commit('SET_QUESTIONS', getQuestion())
    expect(store.state.questions).toEqual(getQuestion())
  })

  it('should add data in quizz when SET_QUIZZ is called', async () => {
    const { store } = createStore()
    await store.commit(
      'SET_QUIZZ',
      getQuizz({ number: 10, category: '9', difficulty: 'easy', type: 'multi' })
    )
    expect(store.state.quizz).toEqual(
      getQuizz({ number: 10, category: '9', difficulty: 'easy', type: 'multi' })
    )
  })

  it('should return the questions when getQuestion is called', async () => {
    const { store } = createStore()
    await store.commit('SET_QUIZZ', getQuizz({ number: 10 }))
    const commit = jest.fn()
    const state = store.state.quizz
    await actions.getQuestions({ commit, state: { quizz: state } })
    expect(commit).toHaveBeenCalledWith('SET_QUESTIONS', getQuestion())
    expect(axios.get).toHaveBeenCalledWith('https://opentdb.com/api.php', {
      params: state,
    })
    expect(axios.get).toHaveBeenCalledTimes(1)
  })
})
