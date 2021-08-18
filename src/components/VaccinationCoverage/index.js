// Write your code here
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const VaccinationCoverage = props => {
  const {coverageDetails} = props
  const DataFormatter = number => {
    if (number === 0) {
      return '0'
    }
    return `${(number / 1000).toString()}k`
  }

  return (
    <ResponsiveContainer width="100%" height={500}>
      <BarChart
        data={coverageDetails}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccine_date"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose_1" name="Dose 1" fill="#2d87bb" barSize="20%" />
        <Bar dataKey="dose_2" name="Dose 2" fill="#f54394" barSize="20%" />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default VaccinationCoverage
