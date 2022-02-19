import React, { useState, useRef, useEffect } from "react";
import { FiPackage, FiDelete} from "react-icons/fi"
import moment from "moment"

export default function Main() {
	const [txt, setTxt] = useState("");
	const [todos, setTodos] = useState([]);
	const [editable, setEditable] = useState(false)

	const todoInputRef = useRef(null);

	const clickHandler = () => {
		const addedTime = moment().format('LT');
		const dateFormat = moment().format('llll');

		const addedAt = {
			addedTime: addedTime,
			dateFormat: dateFormat,
		}

		// create todo,
		const todo = {
			t: txt,
			addedAt: addedAt,
			updated: false, 
		};

		// get todos
		const __todos = [...todos];

		// push to todos
		__todos.splice(0, 0, todo);

		// set todos
		setTodos(__todos);

		// clear input field value
		todoInputRef.current.value = ""
	};

	// Set todos from localStorage
	const setTodosFromStorage = async () => {
		let __datas = await JSON.parse(await localStorage.getItem("__myTodos"))

		if (__datas && __datas != "" && __datas != null && __datas != undefined) {
			setTodos([...__datas])
		} else {
			return
		}
	}

	// delete todo from the list
	const deleteBtnClickHandler = (id) =>{
		const __todos = [...todos]

		const todo = __todos[id]

		__todos.splice(id, 1)

		setTodos(__todos)
	}

	// update todo
	const updateBtnClickHandler = (id) => {
		const __todos = [...todos]
		const oldText = __todos[id].t

		let newTxt = prompt("Update todo", __todos[id].t)

		if (newTxt) {
			__todos[id].t = newTxt
			
			if (oldText != newTxt) {
				__todos[id].updated = true
			}

			setTodos(__todos)
		}

	}

	const changeHandler = (e, id) =>{

		if(e.ctrlKey && e.keyCode == 13){

			updateController(e, id)

		}
	}

	const updateController = (e, id) =>{

		const newTxt = e.target.innerText

		const tmpTodos = [...todos]

		const oldTxt = tmpTodos[id].t

		if(newTxt != oldTxt && newTxt != ""){

			tmpTodos[id].t = newTxt

			tmpTodos[id].updated = true

		} else{

			tmpTodos[id].t = oldTxt

		}

		setTodos(tmpTodos)
	}

	useEffect(() => {
		setTodosFromStorage()
	}, [])

	useEffect(() => {
		if (todos.length >= 1) {
			localStorage.setItem("__myTodos", JSON.stringify(todos))
		} else { return }
	}, [todos])

	return (
		<>
			<div className="relative h-screen w-screen overflow-hidden flex items-center justify-center bg-gray-50">
				<div className="relative w-96 h-auto grid gap-8 border bg-white p-4 overflow-hidden rounded-3xl">
					<form 
						action="#"
						onSubmit={e => e.preventDefault()}
						className="relative w-full h-auto grid gap-5"
					>
						<div className="relative w-full h-12">
							<input
								placeholder="Add Todo Text"
								type="text"
								className="relative w-full h-full rounded-xl duration-200 border focus:border-4 focus:border-white px-4 outline-none ring-0 ring-blue-600 focus:ring-2 font-medium text-sm text-gray-800 bg-gray-50 focus:bg-gray-100"
								onKeyUp={(e) => setTxt(e.target.value)}
								ref={todoInputRef}
							/>
						</div>

						<button
							type="submit"
							className="relative hidden"
							onClick={() => {
								const value = todoInputRef.current.value

								if (value && value.length >= 1) {
									clickHandler()
								}
							}}
						>
							{"Add Todo"}
						</button>
					</form>

					<div className="relative w-full h-auto overflow-auto">
						{todos.length > 0
							? (
								<div className="relative w-full h-auto rounded-xl overflow-hidden  bg-gray-50 grid gap-0 divide-y border">
									{
										todos.map((todo, id) => (
											<div 
												key={id} 
												className="relative w-full h-auto duration-200 hover:bg-gray-100 px-5 py-2 flex items-center justify-between"
												onClick={() => setEditable(true)}
												>
												<div className="relative flex items-start gap-4">
													<div className="relative font-extrabold text-base text-gray-900 text-left">
														{id+1}
													</div>

													<div className="relative h-auto grid gap-0">
														<div 
															className="relative font-medium outline-none text-base text-gray-700 text-left" 
															contentEditable={editable}
															onKeyUp={(event)=>{changeHandler(event, id)}}
															onBlur={(event)=>{updateController(event, id)}}
															suppressContentEditableWarning={true}>
															{todo.t}
														</div>

														<div className="relative flex items-center gap-2">
															<div className="relative text-xs text-gray-500 text-left">
																{todo.addedAt ? todo.addedAt.addedTime : ''}
															</div>

															{
																todo.addedAt ? (
																	<div className="relative px-2 py-1 rounded-md border bg-gray-50 text-[9px] text-gray-600">
																		{moment(todo.addedAt.dateFormat).fromNow()}
																	</div>
																) : null
															}

															{
																todo.updated ? <div className="relative w-2 h-2 rounded-full bg-blue-400" /> : null
															}
														</div>
													</div>
												</div>

												<div className="relative flex items-center gap-4">
													<div 
														className="relative flex items-center justify-center cursor-pointer" 
														onClick={() => deleteBtnClickHandler(id)}
														>
														<FiDelete color="#f1f" size="17" />
													</div>
												</div>
											</div>
										))
									}
								</div>
							)
							: (
							<div className="relative w-full h-36 flex items-center justify-center">
								<div className="relative w-auto h-auto grid gap-4 justify-items-center">
									<FiPackage color="#3498DB" size={100} />

									<div className="font-medium text-xs text-gray-700 inline-flex gap-1 items-center capitalize">
										<span>
											{"You don't have any yet."}
										</span>

										<span style={{ color: '#3498DB' }}>
											{"todos"}
										</span>

										<span>
											{"yet."}
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
