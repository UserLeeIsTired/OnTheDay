import { View, Text } from 'react-native'
import React from 'react'
import { BarChart } from 'react-native-gifted-charts'

const SummaryChart = ({ text, data }) => {
  return (
    <View className="w-[95%] p-5 items-center bg-white rounded-md">
      <BarChart 
        data={[{value: 1, label: "11/30" }, {value: 6, label: "12/1" }, {value: 2, label: "12/2" },{value: 5, label: "12/3" }]}
        height={200}
        width={250}
        barWidth={25}
        spacing={20}
        labelWidth={20}
        xAxisThickness={0}
        yAxisThickness={0}
        xAxisLabelTextStyle={{color : "gray"}}
        yAxisTextStyle={{color : "gray"}}
        frontColor={"#123456"}
        isAnimated
      />
      <Text className="font-semibold">Project work time</Text>
    </View>
  )
}

export default SummaryChart