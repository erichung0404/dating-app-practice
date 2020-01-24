import React, { useEffect } from 'react'; 
import { 
	Modal, 
	View, 
	Text, 
	StyleSheet, 
	SectionList, 
	FlatList, 
	Switch, 
	Dimensions, 
	Animated, 
	TouchableOpacity
} from 'react-native'; 
import { Entypo } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { createAppContainer } from 'react-navigation'; 
import { createStackNavigator } from 'react-navigation-stack'; 

import Header from './Header'; 

const DATA = [
	{
		title: 'ACCOUNT', 
		data: [
			{
				title: 'Phone', 
				data: '12345678'
			}, 
			{
				title: 'Email', 
				data: 'abcde@gmail.com'
			}
		]
	}, 
	{
		title: 'DISCOVERY', 
		data: [
			{
				title: 'Location', 
				data: 'My Location'
			}, 
			{
				title: 'Max Distance', 
				data: '0 km'
			}, 
			{
				title: 'Show Me', 
				data: 'Male'
			}, 
			{
				title: 'Age', 
				data: '18-64'
			}
		]
	}, 
	{
		title: '', 
		data: [
			{
				title: 'Show Me on App', 
				data: 'yes'
			}
		]
	}, 
	{
		title: 'Notification', 
		data: [
			{
				title: 'Push Notification'
			}
		]
	}
]

export default createAppContainer(createStackNavigator({
	Settings: { 
		screen: ({ navigation, screenProps }) => <Settings navigation={navigation} slideOut={screenProps.slideOut} />, 
		navigationOptions: ({ navigation }) => ({
			headerRight: () => <Header done={navigation.state.params ? navigation.state.params.slideOut : null} />, 
			headerTitleStyle: { fontSize: 20 }
		})
	}, 
	PhoneSetup: {screen: PhoneSetup}, 
	EmailSetup: {screen: EmailSetup}, 
	LocationSetup: {screen: LocationSetup}, 
	MaxDistanceSetup: {screen: MaxDistanceSetup}, 
	ShowMeSetup: {screen: ShowMeSetup}, 
	AgeSetup: { screen: AgeSetup}
}, {
	initialRoute: 'Settings', 
}))

const { width, height } = Dimensions.get('screen'); 

function Settings(props) {
	const { navigation, slideOut } = props; 

	useEffect(() => {
		navigation.setParams({slideOut}); 
	}, [])

	return (
		<View style={styles.container}>
			<SectionList 
				keyExtractor={(item, index) => item + index}
				sections={DATA}
		        renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
		        stickySectionHeadersEnabled={false}
		        renderItem={({ item }) => {
		        	switch(item.title) {
		        		case 'Location': 
		        			return (
		        				<Item 
		        					item={item}
		        					navigate={() => navigation.push('LocationSetup')}
		        					RightComponent={<Text style={styles.item_data}>{item.data}</Text>}
		        					BottomComponent={<Text style={styles.item_data}>Todo: fetch location</Text>}
		        				/>
	        				)
        				case 'Max Distance': 
        					return (
        						<Item
        							item={item}
        							navigate={() => navigation.push('MaxDistanceSetup')}
        							routing={false}
        							RightComponent={<Text style={styles.item_data}>Todo: slider value</Text>}
		        					BottomComponent={
		        						<MultiSlider
											containerStyle={{alignSelf: 'flex-end', paddingRight: 15}}
											sliderLength={320}
											values={[0]}
											min={0}
											max={1}
											selectedStyle={{backgroundColor: 'red'}}
											unselectedStyle={{backgroundColor: 'lightgray'}}
										/>
									}
        						/>
    						)
						case 'Show Me on App': 
							return (
								<Item
        							item={item}
        							navigate={() => navigation.push('ShowMeSetup')}
        							routing={false}
        							RightComponent={
        								<Switch 
        									trackColor={{true: 'red', false: 'grey'}}
        									style={styles.item_data}
        									value={true}
        									
    									/>
        							}
        						/>
							)
						case 'Age': 
							return (
								<Item 
									item={item}
									navigate={() => navigation.push('AgeSetup')}
									routing={false}
									BottomComponent={
										<MultiSlider
											containerStyle={{alignSelf: 'flex-end', paddingRight: 15}}
											sliderLength={320}
											values={[18, 64]}
											min={18}
											max={64}
											selectedStyle={{backgroundColor: 'red'}}
											unselectedStyle={{backgroundColor: 'lightgray'}}
										/>
									}
								/>
							)
						case 'Push Notification': 
							return (
		        				<Item 
		        					item={item}
		        				/>
	        				)
		        		default: 
		        			return (
		        				<Item item={item} />
			    			)
		        	}
        			
        		}}
			/>
		</View>
	)
}


function Item({ item, navigate, routing=true, LeftComponent, RightComponent, BottomComponent }) {
	return (
		<TouchableOpacity onPress={navigate}>
			<View style={styles.item_container}>
				<View style={styles.item_panel_container}>
		    		<View style={styles.item_panel_cols}>
		    			<View style={styles.item_panel}>
		    				<View style={styles.item}>
			    				{ LeftComponent ? LeftComponent : <Text style={styles.item_title}>{item.title}</Text> }
		    				</View>
		    				<View style={styles.item}>
			    				{ RightComponent ? RightComponent : <Text style={styles.item_data}>{item.data}</Text> }
		    				</View>
						</View>
						{ BottomComponent ? BottomComponent : null }
					</View>
					{
						routing ? 
							<Entypo
								name={'chevron-right'}
								size={20}
								style={styles.icon}
							/> : null
					}
				</View>
			</View>
		</TouchableOpacity>
	); 

	function onHandlerStateChange({ nativeEvent }) {
		const { state } = nativeEvent; 
		if(state === State.END) slideIn(); 
	}

	function slideIn() {
		Animated.spring(pan, {
			toValue: {x: 0, y: 0}, 
			bounciness: 0
		}).start(); 
	}
}

function PhoneSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'yellow'}} />
	)
}

function EmailSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'orange'}} />
	)
}

function LocationSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'green'}} />
	)
}

function MaxDistanceSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'white'}} />
	)
}

function ShowMeSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'blue'}} />
	)
}

function AgeSetup(props) {
	return (
		<View style={{flex: 1, backgroundColor: 'red'}} />
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}, 
	title: {
		paddingLeft: 15, 
		color: 'grey', 
		marginTop: 40, 
		marginBottom: 5
	}, 
	item_container: {
		backgroundColor: 'white', 
		minHeight: 50
	}, 
	item_panel_container: {
		flex: 1, 
		flexDirection: 'row', 
		width: '95%', 
		alignSelf: 'flex-end', 
		borderBottomColor: 'lightgrey', 
		borderBottomWidth: 1, 
		marginRight: 5
	}, 
	item_panel_cols: {
		flex: 1, 
		justifyContent: 'center', 
		marginRight: 5
	}, 
	item_panel: {
		flex: 1, 
		flexDirection: 'row'
	}, 
	item: {
		flex: 1, 
		flexDirection: 'column', 
		justifyContent: 'center'
	}, 
	item_title: {
		fontSize: 18, 
		alignSelf: 'flex-start'
	}, 
	item_data: {
		alignSelf: 'flex-end', 
		paddingRight: 5, 
		fontSize: 18, 
		color: 'grey'
	}, 
	item_bottom: {
		flex: 1
	}, 
	icon: {
		alignSelf: 'center', 
		paddingRight: 5, 
		color: 'lightgrey'
	}
})