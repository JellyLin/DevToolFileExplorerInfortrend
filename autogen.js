function autoMakeDir(total=100, delay=300){

	target = fm.cwd()['hash'];
	cnt = 1;
	a = setInterval(function(){
		fm.request({
			'cmd': 'mkdir',
			'name': 'AutoCreateFolder ' + cnt,
			'target': target,

		});
		cnt++;
		if(cnt > total)
			clearInterval(a)
	}, delay);
}

function autoRemoveDir(){
	var removeCWD = fm.cwd()['_scandir_path'],
		targets = [];
	$.each(fm.files(), function(i,v){
		if (v['_scandir_path'].indexOf(removeCWD) === 0 && v['_scandir_path'] !== removeCWD) {
			targets.push(v);
		}
	});

	var total = targets.length,
		cnt = 0;
	b = setInterval(function(){
		if(cnt > total-1){
			clearInterval(b);
			return;
		}
		v = targets[cnt];
		fm.exec('open', v.hash);
		console.log("Removing " + v.name);
		setTimeout(function(){
			fm.exec('rm', v.hash);
			setTimeout(function(){
				$('.elfinder-dialog-confirm button:nth-child(1)').click();
			}, 500);
		}, 500);
		cnt++;
	}, 4000);
}


JS 


"l2_Vm9sdW1uXzIvVXNlcjJTZWNvbmRIb21lL1tSTV0gIzM2OTI5RGVsZXRlQ1dERm9sZGVyL05ld0ZvbGRlciAxMC9EZXB0aDFfMjAxODA1MDQxNjE5MDMvQXV0b0NyZWF0ZUZvbGRlciA5Mw"


targets[]: l2_Vm9sdW1uXzIvVXNlcjJTZWNvbmRIb21lL1tSTV0gIzM2OTI5RGVsZXRlQ1dERm9sZGVyL05ld0ZvbGRlciAxMC9EZXB0aDFfMjAxODA1MDQxNjE5MDMvQXV0b0NyZWF0ZUZvbGRlciAyNw