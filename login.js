document.getElementById('loginBtn').addEventListener('click', async () => {
    const userId = document.getElementById('id').value;
    const userPassword = document.getElementById('password').value;

    try {
        const res = await fetch(`${userId}UserInfo.json`)

        if (res.status === 404) {
            alert('아이디가 존재하지 않습니다.')
            return;
        }
        if (res.status === 200) {
            const userData = await res.json()
            if (userData.password === userPassword) {
                window.location.href = `https://realsydrid.github.io/mybasket/${userId}MyInfo.html`;
            } else {
                alert('비밀번호가 일치하지 않습니다.');
            }
        } 
    } catch (error) {        
        console.error('에러');
    }
});