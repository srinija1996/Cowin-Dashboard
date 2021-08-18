// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'
import {GlobalStyle} from './styledComponents'

class CowinDashboard extends Component {
  state = {
    isLoading: false,
    isFailed: false,
    coverageDetails: [],
    ageDetails: [],
    genderDetails: [],
  }

  componentDidMount() {
    this.setState({isLoading: true})
    this.getDetails()
  }

  getDetails = () => {
    fetch('https://apis.ccbp.in/covid-vaccination-data')
      .then(response => response.json())
      .then(jsonData => {
        this.setState({
          isLoading: false,
          coverageDetails: jsonData.last_7_days_vaccination,
          ageDetails: jsonData.vaccination_by_age,
          genderDetails: jsonData.vaccination_by_gender,
          isFailed: false,
        })
      })
      .catch(() => {
        this.setState({
          isLoading: false,
          isFailed: true,
        })
      })
  }

  renderLoadingView = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderRespectiveView = () => {
    const {isFailed} = this.state
    if (isFailed) {
      return this.renderFailureView()
    }
    return this.renderSuccessView()
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  renderSuccessView = () => {
    const {coverageDetails, ageDetails, genderDetails} = this.state
    return (
      <div>
        <GlobalStyle />
        <VaccinationCoverage coverageDetails={coverageDetails} />
        <VaccinationByGender genderDetails={genderDetails} />
        <VaccinationByAge ageDetails={ageDetails} />
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div>
        <div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
          />
          <h1>Co-WIN</h1>
        </div>
        <h1>CoWIN Vaccination in India</h1>
        {isLoading ? this.renderLoadingView() : this.renderRespectiveView()}
      </div>
    )
  }
}

export default CowinDashboard
