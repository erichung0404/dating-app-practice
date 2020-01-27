import React from 'react'; 
import { 
	View, 
	Text, 
	SectionList, 
	StyleSheet
} from 'react-native'; 
import { connect } from 'react-redux'; 
import { Entypo } from '@expo/vector-icons';

import Item from './Item'; 

function Phone(props) {
	const { phone } = props; 

	const data = [
		{
			title: 'Phone Number', 
			data: [phone]
		}
	]; 

	return (
		<View>
			<SectionList
				keyExtractor={(item, index) => item + index}
				sections={data}
		        renderSectionHeader={({ section }) => <Text style={styles.title}>{section.title}</Text>}
		        stickySectionHeadersEnabled={false}
		        renderItem={({ item }) => 
		        	<Item 
		        		item={item} 
		        		LeftComponent={<Text style={styles.item_title}>{item}</Text>}
		        		RightComponent={
		        			<Entypo
		        				name={'check'}
		        				size={25}
		        				style={styles.icon}
		        			/>
		        		}
		        		routing={false}
	        		/>
		        }
	        />
	        <Text style={styles.status}>Verified Phone Number</Text>
	        <View style={styles.text_container}>
	        	<Text style={styles.text}>Update My Phone Number</Text>
	        </View>
        </View>
	)
}

const styles = StyleSheet.create({
	title: {
		paddingLeft: 15, 
		color: 'grey', 
		marginTop: 40, 
		marginBottom: 5
	}, 
	item_title: {
		fontSize: 18, 
		alignSelf: 'flex-start'
	}, 
	icon: {
		alignSelf: 'flex-end', 
		paddingRight: 5, 
		color: 'green'
	}, 
	status: {
		color: 'gray', 
		marginLeft: 15
	}, 
	text_container: {
		backgroundColor: 'white', 
		minHeight: 50, 
		marginTop: 30, 
		justifyContent: 'center'
	}, 
	text: {
		textAlign: 'center', 
		fontSize: 20, 
		color: 'red'
	}
})

const mapStateToProps = state => ({
	phone: state.settings.settings['Phone']
})

export default connect(mapStateToProps)(Phone); 