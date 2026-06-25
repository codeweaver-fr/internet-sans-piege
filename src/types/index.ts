export type Screen = 'home' | 'boot' | 'diagnostic' | 'result'

export type QuestionType = 'sms' | 'email' | 'appel'

export interface Choice {
  text: string
  correct: boolean
}

export interface Question {
  type: QuestionType
  sender: string
  scenario: string
  question: string
  choices: Choice[]
  feedback: {
    correct: string
    wrong: string
  }
}