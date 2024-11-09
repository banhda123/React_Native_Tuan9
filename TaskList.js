import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, FlatList, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setTasks, deleteTask ,editTask } from './Redux_Toolkit/taskSlice';

const TaskList = ({ route, navigation }) => {
  const { name } = route.params;
  const API_URL = 'https://67191e067fc4c5ff8f4c81ea.mockapi.io/task';
  const tasks = useSelector((state) => state.tasks.data);
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = React.useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      dispatch(setTasks(data));
    } catch (error) {
      console.error('error ', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      dispatch(deleteTask(id));
    } catch (error) {
      console.error('error', error);
    }
  };

const handleEdit = async (id)=>{
  try {
    await fetch(`${API_URL}/${id}`, {method: 'EDIT'});
    dispatch(editTask(id));
  }catch (error){
    console.error('error', error);
  }
};

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Image source={require('./images/people.png')} style={styles.profileImage} />
          <View>
            <Text style={styles.greeting}>Hi {name}</Text>
            <Text style={styles.subGreeting}>Have a great day ahead</Text>
          </View>
        </View>
      </View>

      <View style={styles.searchInput}>
        <View style={styles.inputForm}>
          <Image source={require('./images/search.png')} style={styles.mail} />
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <View style={styles.section}>
        <SafeAreaView style={{height:'100%'}}>
        <FlatList
          data={filteredTasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.taskItem}>
              <Image source={require('./images/check.png')} style={styles.taskIcon} />
              <Text style={styles.taskTitle}>{item.title}</Text>
              <TouchableOpacity onPress={()=>handleDelete(item.id)}>
                <Image source={require('./images/delete.png')} style={styles.taskIcon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>handleEdit(item.id)}>
                <Image source={require('./images/pencil.png')} style={styles.taskIcon} />
              </TouchableOpacity>
            </View>
          )}
        />
        </SafeAreaView>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.addButton}
        >
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    paddingHorizontal: 10,
  },

  header: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subGreeting: {
    fontSize: 14,
    color: '#999',
  },
  headerInfo: {
    flexDirection: 'row',
  },


  searchInput: {
    flex: 1,
  },

  inputForm: {
    flexDirection: "row",
    width: "100%",
  },
  mail: {
    position: "absolute",
    bottom: 35,
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
    width: "100%",
    paddingLeft: 40,
  },

  section: {
    flex: 2,
  },

  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  taskIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  taskTitle: {
    flex: 1,
  },
  footer: {
    flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 100,
    right: 160,
    backgroundColor: '#40E0D0',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default TaskList
