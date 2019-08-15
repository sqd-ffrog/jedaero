import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import BusTb from '../../../../jsons/busschedule.json';
import BusA from '../../../../tool/busA';
import BusB from '../../../../tool/busB';
import BusRoute from '../../../../jsons/bus_stop.json';
import { mainScreen } from '../../../styles/busStyle.js';
import busCardStyle from '../../../styles/busCardStyle.js';

export default class Bustime extends Component {
    constructor(props) {
        super(props);
        this.state= {
            selectedIndex: 0,
            //버스시간 알고리즘 리턴 값
            A: BusA(BusTb.timeTable.A, 0),
            B: BusB(BusTb.timeTable.B, 0),
            // bustop: BusTb.routeName.A
        };
        //정거장 목록
        this.data = BusRoute.routeName.A
       
    }
 
    // componentDidMount = () => this.buscheck();

    buscheck = () => {
        setInterval( () => {
            this.setState({
                A: BusA(BusTb.timeTable.A, this.state.value),
                B: BusB(BusTb.timeTable.B, this.state.value)})
            
        }, 25000)
    }

    render() {
        return(
            <View style={mainScreen.blockView}>
               <View style={{...mainScreen.blockViewTitle, backgroundColor: '#334955',}}>
                  <Text style={mainScreen.blockViewTitleText}>
                        <Text style={{color: '#d6ecfa'}}>{this.data[this.state.selectedIndex].name}</Text> {this.props.name}
                  </Text>
                  {/* <Picker 
                    ref={instance => this.dropDownPicker = instance} 
                    data={this.data} 
                    label={'name'} 
                    value={'value'}
                    onValueChange={(value, selectedIndex) => {
                          this.setState({
                            selectedIndex,
                            value,
                            A: BusA(BusTb.timeTable.A, value),
                            B: BusB(BusTb.timeTable.B, value)
                         })
                            this.buscheck()
                        }
                    }/> */}
                  <TouchableOpacity onPress={() => this.dropDownPicker.setModalVisible(true)}>
                     <Text style={busCardStyle.busStopViewer}>정류장별 보기</Text>
                  </TouchableOpacity>
                </View>
                <View style={{...mainScreen.blockViewContainer, flexDirection: 'row',}}>
                {/* A버스 시간 안내 */}
                    <View style={mainScreen.blockViewContainerMain}>
                        <Text style={mainScreen.blockTitle}>A</Text>
                        <Text style={mainScreen.busWay}>반시계방향</Text>
                    </View>
                    <View style={mainScreen.blockViewContainerSub}>
                        <Text style={mainScreen.blockText}>{this.state.A}</Text>
                    </View>
                {/* B버스 시간 안내 */}     
                    <View style={mainScreen.blockViewContainerMain}>
                        <Text style={mainScreen.blockTitle}>B</Text>
                        <Text style={mainScreen.busWay}>시계방향</Text>
                    </View>
                    <View style={mainScreen.blockViewContainerSub}>
                        <Text style={mainScreen.blockText}>{this.state.B}</Text>
                    </View>
                </View>
            </View>
        )
    }
}