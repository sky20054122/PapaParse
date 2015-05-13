/**
 * Created by brxy on 2015/5/13.
 */


var stepped = 0, chunks = 0, rows = 0;

var parser;
var pauseChecked = false;
var printStepChecked = false;

$(function(){

    $('#submit-parse').click(function()
    {
        stepped = 0;
        chunks = 0;
        rows = 0;

        var files = $('#files')[0].files;
        var config = buildConfig();


        if (files.length > 0)
        {


            $('#files').parse({
                config: config,
                before: function(file, inputElem)
                {
                    console.log("Parsing file:", file);
                },
                complete: function()
                {
                    console.log("Done with all files.");
                }
            });
        }
        else
        {

            var results = Papa.parse(txt, config);
            console.log("Synchronous parse results:", results);
        }
    });

    $('#submit-unparse').click(function()
    {
        var input = $('#input').val();
        var delim = $('#delimiter').val();

        var results = Papa.unparse(input, {
            delimiter: delim
        });

        console.log("Unparse complete!");
        console.log("--------------------------------------");
        console.log(results);
        console.log("--------------------------------------");
    });



});



function errorFn(error, file)
{
    console.log("ERROR:", error, file);
}

//The callback to execute when parsing is complete. It receives the parse results. If parsing a local file, the File is passed in, too:
function completeFn(results, file)
{
    console.log("Parsing complete:", results, file);
//    var html = "";
//    $(results.data).each(function(index,device){
//        html+="<tr><td>"+device.number+"</td><td>"+device.UUID+"</td><td>"+device.genaration+"</td><td>"+device.subversion+"</td></tr>";
//    });
//    $("#result").html(html);
}

//To stream the input, define a callback function:
 function step(results, parser) {
    console.log("Row data:", results.data);
     var device = results.data[0];
     $("#result").append("<tr><td>"+device.number+"</td><td>"+device.UUID+"</td><td>"+device.genaration+"</td><td>"+device.subversion+"</td></tr>");
    console.log("Row errors:", results.errors);
     parser.pause();
     setTimeout(function(){
         parser.resume();
     },2000)
}


function buildConfig()
{
    return {
        delimiter: "",	// auto-detect
        newline: "",	// auto-detect
        header: true,  //true第一行解析为表头
        dynamicTyping: false, //数值是否转型
        preview: 0,  //如果>0只解析多少航限制
        encoding: "GBK", //文件编码格式
        worker: false, //Whether or not to use a worker thread. Using a worker will keep your page reactive, but may be slightly slower.
        comments: false, //跳过注释行  #  //
        step: step, //可以设置函数，步进解析文件
        complete: completeFn, //完成触发函数
        error: errorFn,//发生错误触发函数
        download: false, //是否生成下载url
        skipEmptyLines: true, //是否跳过空行
        chunk: undefined, //回调函数，文件是否分块读取
        fastMode: undefined,
        beforeFirstChunk: undefined
    };


}





