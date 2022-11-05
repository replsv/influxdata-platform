// Libraries
import _ from 'lodash'
import React, {PureComponent, ChangeEvent} from 'react'

// Components
import {
  ComponentSpacer,
  Form,
  Grid,
  Columns,
  Input,
  Radio,
  ButtonShape,
} from 'src/clockface'
import TaskOptionsOrgDropdown from 'src/tasks/components/TasksOptionsOrgDropdown'
import FluxEditor from 'src/shared/components/FluxEditor'
import TaskScheduleFormField from 'src/tasks/components/TaskScheduleFormField'

// Types
import {TaskOptions, TaskSchedule} from 'src/utils/taskOptionsToFluxScript'
import {Alignment, Stack, ComponentStatus} from 'src/clockface/types'
import {Organization} from 'src/api'

// Styles
import './TaskForm.scss'

interface Props {
  script: string
  orgs: Organization[]
  taskOptions: TaskOptions
  onChangeScheduleType: (schedule: TaskSchedule) => void
  onChangeScript: (script: string) => void
  onChangeInput: (e: ChangeEvent<HTMLInputElement>) => void
  onChangeTaskOrgID: (orgID: string) => void
}

interface State {
  retryAttempts: string
  schedule: TaskSchedule
}

export default class TaskForm extends PureComponent<Props, State> {
  constructor(props) {
    super(props)

    this.state = {
      retryAttempts: '1',
      schedule: props.taskOptions.taskScheduleType,
    }
  }

  public render() {
    const {
      script,
      onChangeInput,
      onChangeScript,
      onChangeTaskOrgID,
      taskOptions: {name, taskScheduleType, interval, offset, cron, orgID},
      orgs,
    } = this.props

    return (
      <div className="task-form">
        <div className="task-form--options">
          <Form>
            <Grid>
              <Grid.Row>
                <Grid.Column widthXS={Columns.Twelve}>
                  <Form.Element label="Name">
                    <Input
                      name="name"
                      placeholder="Name your task"
                      onChange={onChangeInput}
                      value={name}
                    />
                  </Form.Element>
                </Grid.Column>
                <Grid.Column widthXS={Columns.Twelve}>
                  <Form.Element label="Owner">
                    <TaskOptionsOrgDropdown
                      orgs={orgs}
                      selectedOrgID={orgID}
                      onChangeTaskOrgID={onChangeTaskOrgID}
                    />
                  </Form.Element>
                </Grid.Column>
                <Grid.Column widthXS={Columns.Twelve}>
                  <Form.Element label="Schedule Task">
                    <ComponentSpacer
                      align={Alignment.Left}
                      stackChildren={Stack.Rows}
                    >
                      <Radio shape={ButtonShape.StretchToFit}>
                        <Radio.Button
                          id="interval"
                          active={taskScheduleType === TaskSchedule.interval}
                          value={TaskSchedule.interval}
                          titleText="Interval"
                          onClick={this.handleChangeScheduleType}
                        >
                          Interval
                        </Radio.Button>
                        <Radio.Button
                          id="cron"
                          active={taskScheduleType === TaskSchedule.cron}
                          value={TaskSchedule.cron}
                          titleText="Cron"
                          onClick={this.handleChangeScheduleType}
                        >
                          Cron
                        </Radio.Button>
                      </Radio>
                      <TaskScheduleFormField
                        onChangeInput={onChangeInput}
                        schedule={taskScheduleType}
                        interval={interval}
                        offset={offset}
                        cron={cron}
                      />
                    </ComponentSpacer>
                  </Form.Element>
                </Grid.Column>
                <Grid.Column widthXS={Columns.Twelve}>
                  <Form.Element label="Retry attempts">
                    <Input
                      name="retry"
                      placeholder=""
                      onChange={this.handleChangeRetry}
                      status={ComponentStatus.Disabled}
                      value={this.state.retryAttempts}
                    />
                  </Form.Element>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Form>
        </div>
        <div className="task-form--editor">
          <FluxEditor
            script={script}
            onChangeScript={onChangeScript}
            visibility="visible"
            status={{text: '', type: ''}}
            suggestions={[]}
          />
        </div>
      </div>
    )
  }

  private handleChangeRetry = (e: ChangeEvent<HTMLInputElement>): void => {
    const retryAttempts = e.target.value
    this.setState({retryAttempts})
  }

  private handleChangeScheduleType = (schedule: TaskSchedule): void => {
    this.props.onChangeScheduleType(schedule)
  }
}
