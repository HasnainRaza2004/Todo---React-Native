import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from "react-native-vector-icons/MaterialIcons"



const App = () => {
  const [textInput, setTextInput] = React.useState("")
  const [todos, setTodos] = React.useState([]);
  const deleteTodo = (todoId)=>{
  const newTodos = todos.filter(item=>item.id != todoId)
  setTodos(newTodos)
  }

  const deleteAllTodos = ()=>{
  setTodos([]);
  }
    const ListItem = ({ todo }) => {

    const markTodoCompeleted = (todoId) => {
      const newtodos = todos.map((item) => {
        if (item.id == todoId) {
          return { ...item, compeleted: true }
        }
        return item;
      });
      setTodos(newtodos)
    }
    return (
      <View style={Styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: "white", fontWeight: "bold", fontSize: 15,
              textDecorationLine: todo?.compeleted ? "line-through" : "none"
            }}>
            {todo?.task}
          </Text>
        </View>
        {
          !todo?.compeleted && (
            <TouchableOpacity style={[Styles.actionIcon]} onPress={() => markTodoCompeleted(todo?.id)}>
              <Icon name='done' color="White" />
            </TouchableOpacity>
          )
        }
        <TouchableOpacity style={[Styles.actionIcon, { backgroundColor: "red" }]} onPress={()=>deleteTodo(todo?.id)}>
          <Icon name='delete' color="White" />
        </TouchableOpacity>
      </View>
    )
  }
  const addTodo = () => {
    if (textInput == "") {
      Alert.alert("Error", "Please enter todo")
    }
    else {
      const newTodo = {
        id: todos.length + 1,
        task: textInput,
        compeleted: false
      }
      setTodos([...todos, newTodo])
      setTextInput("")
    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={Styles.header}>
        <Text style={{ fontWeight: "bold", fontSize: 30, color: "darkblue" }}>TODO APP</Text>
        <Icon name='delete' size={30} color="red" onPress={()=>deleteAllTodos()}/>
      </View>
      <FlatList
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />} />
      <View style={Styles.footer}>
        <View style={Styles.inputContainer}>
          <TextInput placeholder="Enter Todo"
            value={textInput}
            onChangeText={(text) => setTextInput(text)} />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={Styles.icon}>
            <Icon name='add' color="white" size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between"
  },
  footer: {
    position: "absolute",
    bottom: 0,
    color: "White",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: "black",
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 5,
    borderRadius: 30,
    paddingHorizontal: 20,
    color: "black"
  },
  icon: {
    height: 50,
    width: 50,
    backgroundColor: "darkblue",
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    padding: 20,
    backgroundColor: "black",
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 30,
    width: 30,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3
  }
  // mainContainer:{
  //   flex:1,  
  //   backgroundColor:"white",  
  // },
  // heading:{
  //   textAlign:"center",
  //   color:"cyan",
  //   fontSize:30,
  //   marginTop:20
  // },
  // todoInput:{
  //   backgroundColor:"black",
  //   borderRadius:30,
  //   marginLeft:20,
  //   marginTop:20,
  //   marginRight:20,
  //   paddingLeft:20
  // }
})


export default App;
