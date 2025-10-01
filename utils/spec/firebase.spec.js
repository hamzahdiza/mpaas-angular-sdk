import {
  describe,
  it,
  expect
} from "vitest";
import {
  firebaseScreenView,
  firebaseEvent
} from "../firebase"

my.call = vi.fn((groupId, screenId, callback)=>{
  callback()
})

const groupId = 'test'
const screenId = 'testScreen'
const event = [{name:'button', value:'true'}]
describe('firebase.js', () => {
  it('firebaseScreenView()', () => {
    firebaseScreenView(groupId, screenId)
    expect(my.call).toHaveBeenCalledWith('firebaseScreenView',{GroupId:groupId, ScreenId:screenId}, expect.any(Function))
  })

  it('firebaseEvent()', () => {
    firebaseEvent(groupId, event)
    expect(my.call).toHaveBeenCalledWith('firebaseEvent',{data: JSON.stringify({groupId, event})}, expect.any(Function))
  })

  it('firebaseEvent()', () => {
    firebaseEvent(groupId, event[0])
    expect(my.call).toHaveBeenCalledWith('firebaseEvent',{data: JSON.stringify({groupId, event})}, expect.any(Function))
  })
})