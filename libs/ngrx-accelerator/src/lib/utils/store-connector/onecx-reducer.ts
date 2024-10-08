import { createReducer, on } from '@ngrx/store'
import { OneCxActions } from './onecx-actions'
import { OneCxState } from './onecx-state'

export const oneCxReducer = createReducer<OneCxState>(
  {},
  on(
    OneCxActions.onecxNavigated,
    (state: OneCxState, action): OneCxState => ({
      ...state,
      location: action.location,
    })
  )
)