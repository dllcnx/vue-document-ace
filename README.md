# 示例模板
[demo]( https://dllcnx.github.io/DocumentAce/)

基于ace编辑器实现的一个专门做示例文档的demo.
### 步骤
    1.将写好的demo(html)页面放入case->html文件夹中.
    2.修改case文件夹下面的sider.json文件进行结构配置.
    
### 配置

```json
    {
      "name": "示例文档",
      "logo": "local",
      "defaultOpenItem": "test",
      "icon": "appstore",
      "sider": {
        "test": [
          {
            "key": 1,
            "title": "ceshi1",
            "page": "1.html",
            "icon": "laptop"
          },
          {
            "key": 3,
            "title": "ceshi3",
            "page": "1.html"
          }
        ],
        "test2": [
          {
            "key": 2,
            "title": "ceshi2",
            "page": "2.html",
            "icon": "read"
          }
        ]
      }
    }

```

- name(可选)   
    
    文档名称,头部标题,默认"文档示例"

- logo(可选)   
    
    logo地址,网络图片url填写地址,本地图片填写'local',并将图片文件命名为logo.png放在case目录中.
    
- defaultOpenItem(可选)
    默认打开分类的key,默认第一个
    
- icon(可选)
    分类图标,请去 [ant图标库](https://www.antdv.com/components/icon-cn/),填入想要使用图标名称,默认'appstore'.

- sider(必须)
    
    列表配置,接收对象数据
    
    key: 每个属性的key值将作为文档案例分类名称,不允许重复.
    value: 每个属性的值接收一个数组,作为分类吓的具体案例元素,数组元素为对象.
        
        - key: 案例唯一key,不允许重复
        - title: 案例名称
        - page: 案例demo(html)名称,带扩展名,例如1.html.
        - icon: 图标(可选), 同上icon属性,默认'reader'
    


### 备注
    开发模式下添加案例需要去public下的case中进行操作,然后直行yarn build或者npm run build进行编译.
    已经部署模式下可以直接去dist(名字可能会改变)下的case里面操作添加,不需要编译.
