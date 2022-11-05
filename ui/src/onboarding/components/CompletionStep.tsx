// Libraries
import React, {PureComponent} from 'react'

// Components
import {ErrorHandling} from 'src/shared/decorators/errors'

// Types
import {Button, ComponentColor, ComponentSize} from 'src/clockface'
import {OnboardingStepProps} from 'src/onboarding/containers/OnboardingWizard'

@ErrorHandling
class CompletionStep extends PureComponent<OnboardingStepProps> {
  public componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown)
  }

  public componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown)
  }

  public render() {
    const {onExit, onDecrementCurrentStepIndex} = this.props

    return (
      <div className="wizard--bookend-step">
        <div className="splash-logo secondary" />
        <h3 className="wizard-step--title">Setup Complete!</h3>
        <h5 className="wizard-step--sub-title" />
        <div>
          <Button
            color={ComponentColor.Default}
            text="Back to Verify"
            size={ComponentSize.Large}
            onClick={onDecrementCurrentStepIndex}
          />
          <Button
            color={ComponentColor.Success}
            text="Go to InfluxDB 2.0"
            size={ComponentSize.Large}
            onClick={onExit}
          />
        </div>
      </div>
    )
  }

  private handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Enter') {
      this.props.onExit()
    }
  }
}

export default CompletionStep
