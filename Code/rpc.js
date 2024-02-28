const { kill } = require('process');
const find = require('find-process');
const { exec } = require('child_process');
let os = require('os')

var clientId = localStorage.getItem("clientId");
var state = localStorage.getItem("state");
var largeimg = localStorage.getItem("largeimg");
var largetext = localStorage.getItem("largetext");
var ButtonLabel = localStorage.getItem("ButtonLabel");
var ButtonLink = localStorage.getItem("ButtonLink");
var ButtonTwo = "Хочешь также?";
var LinkTwo = "https://github.com/SAMURASA/Discord-Rich-Presence/releases";
var now;

if(localStorage.getItem("checkboxchecked") === "1"){
    now = Date.now();
}else{
    now = null;
}
//const clientId = "1201689633168314398";
const DiscordRPC = require('discord-rpc');
const RPC = new DiscordRPC.Client({ transport: 'ipc'});
DiscordRPC.register(clientId);
async function setActivity(){
    if(!RPC) return;
    RPC.setActivity({
        //details: 'Checking',
        //type: "STREAMING",
        state: state,
        //largeImageKey: 'https://media1.tenor.com/m/NQfq1liFH-8AAAAd/byuntear-sad.gif',
        largeImageKey: largeimg,
        largeImageText: largetext,
        // smallImageKey: "https://media1.tenor.com/m/eicSbqkXDFIAAAAd/byuntear-react.gif",
        // smallImageText: "wow, nothing",
        instance: false,
        startTimestamp: now,
        //endTimestamp: 0,
        buttons:[
            {
                label: ButtonLabel,
                url: ButtonLink
            },
            // {
            //     label: ButtonTwo,
            //     url: LinkTwo
            // }
        ]
    })
}

RPC.on('ready', async () => {
    console.log("RPC WORK")
    setActivity();

    // setInterval(() =>{
    //     setActivity();
    // }, 15000);
});

RPC.login({clientId: clientId}).catch(err => {
    if(err == "Error: RPC_CONNECTION_TIMEOUT"){
        if(confirm("I want restart discord")){

            find('name', 'Discord', true).then(function (list) {
            //console.log(' %s Discord', list.length, list[1].pid);

            for(let i = 0; i < list.length; i++){
                kill(list[i].pid,"SIGINT")
             }

                function startprocess(){
                    const executablePath = `${os.homedir}\\AppData\\Local\\Discord\\Update.exe --processStart Discord.exe`;
                        exec(executablePath, (error) => {
                            if (error) {
                                alert("I can't start Discord :(")
                             return;
                            }
                            // console.log(`stdout: ${stdout}`);
                            // console.error(`stderr: ${stderr}`);
                        });
                        setInterval(function(){
                            location.reload();
                        }, 12000);
                }
                startprocess();

            });

        }
    }
});


