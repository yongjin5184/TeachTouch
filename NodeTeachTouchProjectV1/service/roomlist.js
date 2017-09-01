/**
 * 방목록 조회 API
 */
app.post('/roomlist',function(req,res){
	 res.header('Access-Control-Allow-Origin', '*');
     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	console.log("recved data : " + req.body.group_num);
	var group_room = []; //현재 client가 있는 group의 room 리스트들
	var room_manage_obj = io.sockets.manager.rooms; 
	var grouop_room_manage_obj = {}; // 해당 그룹의 방정보
	
	for(var i=0; i<room_manage.length; i++){
		if(Number(room_manage[i].group_num) == Number(req.body.group_num)){
			group_room = room_manage[i].rooms;
		}
	}
	
	for(var i=0; i<group_room.length; i++){
		var room = group_room[i];
		//console.log("room : "+room)
		for(var key in room_manage_obj){
			if(room.room_name == key.split("/").join("")){
				var obj_key = '/'+room.room_name;
				grouop_room_manage_obj[obj_key] = room_manage_obj[key];
				break;
			}
		}
	}
	//res.send(io.sockets.manager.rooms);
	console.log("four : "+JSON.stringify(grouop_room_manage_obj));
	res.send(grouop_room_manage_obj);
});