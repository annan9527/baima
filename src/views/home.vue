<template>
  <div>
    <div class="content">
      <div class="heard" @click="dangzhibuDialogVisible = true">
        <h1>白马新村党支部</h1>
      </div>
      <!-- 第一格 -->
      <div class="top">
        <div class="top_left" style="padding-right: 42px">
          <span>空间划分</span>
        </div>
        <div class="top_rigth">
          <div class="one">
            <span>平时2个网格（党小组）</span>
            <span @click="secondDialogVisible = true">南片网格</span>
            <span @click="thirdDialogVisible = true">北片网络</span>
          </div>
          <div class="two" @click="zhanshiDialogVisible = true">
            站时19个微网格
          </div>
        </div>
      </div>
      <!-- 第二格 -->
      <div class="second">
        <div class="left">
          <div class="one">
            <div class="one_left" style="padding-right: 42px">
              <span>日常任务</span>
            </div>
            <!-- 右边 -->
            <div class="one_rigth">
              <div class="top">
                <span style="line-height: 76px; margin-right: 10px"
                  >政策宣传</span
                >
                <span style="background-color: #fdb245; margin-right: 10px">
                  <div style="margin-top: 10px">网格巡查</div>
                  <div>（人口五色管理）</div>
                </span>
                <span style="line-height: 76px; margin-right: 10px"
                  >矛盾调解</span
                >
                <span style="line-height: 76px; margin-right: 10px"
                  >网格代办</span
                >
              </div>
              <div class="button">
                <span style="margin-right: 10px" @click="wuseHandle('人在户在')"
                  >人在户在</span
                >
                <span
                  style="background: #00e676; margin-right: 10px"
                  @click="wuseHandle('人在户不在')"
                  >人在户不在</span
                >
                <span
                  style="background: #ffea00; margin-right: 10px"
                  @click="wuseHandle('人不在户在')"
                  >人不在户在</span
                >
                <span
                  style="background: #ff9100; margin-right: 10px"
                  @click="wuseHandle('人户都不在')"
                  >人户都不在</span
                >
                <span
                  style="background: #ff3d00; margin-right: 10px"
                  @click="wuseHandle('租户')"
                  >租户</span
                >
              </div>
            </div>
          </div>
          <!-- 第二行 -->
          <div class="two">
            <div class="two_left">
              <span>力量配备</span>
            </div>
            <div class="two_rigth">
              <div class="nameinfo">
                <span> 党支部书记 </span>
                <span> （翁秋英） </span>
              </div>
              <div class="changbei">
                <div class="navbox">常备力量</div>
                <div class="buttonbox">
                  <div @click="wanggezhangDialogVisible = true">
                    <span>网格长</span>
                  </div>
                  <div
                    style="margin-left: 10px"
                    @click="zhuanzhiwanggeyuanDialogVisible = true"
                  >
                    <span>专职网格员</span>
                  </div>
                  <div
                    style="margin-left: 10px"
                    @click="jianzhiweiwanggeyuanDialogVisible = true"
                  >
                    <span> 兼职网格员</span>
                  </div>
                  <div
                    style="margin-left: 10px"
                    @click="wanggezhidaoyuanDialogVisible = true"
                  >
                    <span>网格指导员</span>
                  </div>
                  <div
                    style="margin-left: 10px"
                    @click="weiwanggeDialogVisible = true"
                  >
                    <span>微网格员</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="two_rigth2">
              <div class="box1">
                <div class="zhiyuan">支援力量</div>
                <!-- 内容 -->
                <div class="contets">
                  <div style="margin-right: 10px">
                    <span style="width: 49px"> 机关和企事业单位下沉人员 </span>
                  </div>
                  <div><span style="width: 69px">民兵 医护人员</span></div>
                </div>
              </div>
              <div class="box1">
                <div class="zhiyuan">全民力量</div>
                <!-- 内容 -->
                <div class="contets">
                  <div style="margin-right: 10px">
                    <span style="writing-mode: vertical-rl"> 楼栋长 </span>
                  </div>
                  <div>
                    <span style="writing-mode: vertical-rl">其他志愿者</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tree">
            <div class="tree_left">
              <span>战时岗位转换</span>
            </div>
            <div class="tree_rigth">
              <div class="nameinfo">
                <span> 综合统筹岗</span>
              </div>
              <div class="tabel">
                <div class="tableleft">
                  <div class="wangge">
                    <span> 网格统筹岗</span>
                  </div>
                  <div class="big">
                    <span>
                      分别统筹 网格临时管控网格人员转运网格核酸检测 网格物资配送
                      网格需求收集
                    </span>
                  </div>
                </div>
                <div class="tablerigth">
                  <div class="one">
                    <span style="width: 49px"
                      >统筹整村信息收集及报送(数字化、信息化类工作)</span
                    >
                  </div>
                  <div class="two">
                    <span style="width: 49px"
                      >物资配送人员转运秩序维护卡口值班核酸检测</span
                    >
                  </div>
                  <div class="tree">
                    <span style="width: 89px"
                      >最小作战单元摸清人口底数组织核酸检测发放生活物资收集需求信息</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rigth">
          <div class="zhidubaozhang">制度保障</div>
          <div class="neirong">
            <div style="margin-right: 10px">
              <span>五色管理机制 &nbsp 在册人口 &nbsp &nbsp流动人口</span>
            </div>
            <div style="margin-right: 10px">
              <span
                >应急管理机制 &nbsp &nbsp &nbsp人员&nbsp&nbsp 物资&nbsp&nbsp
                车辆</span
              >
            </div>
            <div style="margin-right: 10px">
              <span
                >指令传导机制 &nbsp&nbsp &nbsp乡镇 &nbsp&nbsp社区
                &nbsp&nbsp网格</span
              >
            </div>
            <div>
              <span>问题销号机制&nbsp &nbsp统一汇总 &nbsp&nbsp逐个交办</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹层 -->
    <el-dialog
      :visible.sync="secondDialogVisible"
      fullscreen
      :modal="false"
      @open="open()"
      @close="close()"
    >
      <iframe
        src="http://www.quzhousznc.cn/bm/admin/nanpian.html"
        frameborder="0"
        style="
          width: 100%;
          height: 1080px;
          margin: 0;
          padding: 0;
          overflow: hidden;
        "
      >
      </iframe>
    </el-dialog>
    <el-dialog
      :visible.sync="thirdDialogVisible"
      fullscreen
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <iframe
        src="http://www.quzhousznc.cn/bm/admin/beipian.html"
        frameborder="0"
        style="
          width: 100%;
          height: 1080px;
          margin: 0;
          padding: 0;
          overflow: hidden;
        "
      >
      </iframe>
    </el-dialog>
    <el-dialog
      :visible.sync="dangzhibuDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <div style="display: flex; justify-content: space-around">
        <div style="display: flex; flex-direction: column; align-items: center">
          <img
            src="../static/photo/1.png"
            style="height: 500px; width: 340px"
          />
          <h1>支部书记</h1>
          <h2>翁秋英</h2>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <img
            src="../static/photo/2.png"
            style="height: 500px; width: 340px"
          />
          <h1>支部副书记</h1>
          <h2>余良庆</h2>
        </div>
        <div style="display: flex; flex-direction: column; align-items: center">
          <img
            src="../static/photo/3.png"
            style="height: 500px; width: 340px"
          />
          <h1>支委</h1>
          <h2>温田修</h2>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="wuseguanliDialogVisible"
      fullscreen
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <el-table :data="wuseData">
        <el-table-column
          :show-overflow-tooltip="true"
          prop="userName"
          label="姓名"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          width="125"
          prop="houseHold"
          label="户头情况"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          width="125"
          prop="workUnit"
          label="工作单位"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          width="125"
          prop="regionAreaName"
          label="所属地区名称"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="vaccineNum"
          label="疫苗次数"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="vaccineRemark"
          label="疫苗情况"
        />
        <el-table-column width="150" prop="checkTime" label="核酸检测时间" />
        <el-table-column
          :show-overflow-tooltip="true"
          width="110"
          prop="cunLiangWei"
          label="是否存两委"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.cunLiangWei }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          width="110"
          prop="diBaoHu"
          label="是否低保户"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.diBaoHu }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          width="110"
          prop="zhanbeirenyuan"
          label="是否战备人员"
        >
          <template slot-scope="scope">
            <div>{{ scope.row.zhanbeirenyuan }}</div>
          </template>
        </el-table-column>
        <el-table-column
          :show-overflow-tooltip="true"
          prop="domicile"
          label="户籍地"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="domicile"
          label="居住地"
        />
        <el-table-column
          prop="idCard"
          :show-overflow-tooltip="true"
          label="身份证号"
        />
        <el-table-column
          :show-overflow-tooltip="true"
          prop="mobile"
          width="100"
          label="手机号"
        />
      </el-table>
    </el-dialog>
    <el-dialog
      :visible.sync="zhanshiDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/zhanshi.png"
        style="height: 900px; position: relative; top: 0; margin-left: 500px"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="weiwanggeDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/weiwanggeyuan.png"
        style="height: 900px; position: relative; top: 0; margin-left: 500px"
      />
    </el-dialog>
    <el-dialog
      :visible.sync="wanggezhangDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/wanggezhang.png"
        style="
          height: 90px;
          position: relative;
          top: 0;
          margin-left: 500px;
          margin-top: 300px;
        "
      />
    </el-dialog>
    <el-dialog
      :visible.sync="zhuanzhiwanggeyuanDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/zhuanzhiwanggeyuan.png"
        style="
          height: 90px;
          position: relative;
          top: 0;
          margin-left: 500px;
          margin-top: 300px;
        "
      />
    </el-dialog>
    <el-dialog
      :visible.sync="jianzhiweiwanggeyuanDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/jianzhiweiwanggeyuan.png"
        style="
          height: 90px;
          position: relative;
          top: 0;
          margin-left: 500px;
          margin-top: 300px;
        "
      />
    </el-dialog>
    <el-dialog
      :visible.sync="wanggezhidaoyuanDialogVisible"
      fullscreen
      center
      :modal="false"
      style="height: 100%"
      @open="open()"
      @close="close()"
    >
      <img
        src="../static/wanggezhidaoyuan.png"
        style="
          height: 90px;
          position: relative;
          top: 0;
          margin-left: 500px;
          margin-top: 300px;
          overflow: hidden;
        "
      />
    </el-dialog>
  </div>
</template>

<script>
import { Init } from "@/api/tbUsers/tbUsers.js";
export default {
  data() {
    return {
      rightData: {},
      thirdDialogVisible: false,
      secondDialogVisible: false,
      centerDialogVisible: false,
      dangzhibuDialogVisible: false,
      wuseguanliDialogVisible: false,
      weiwanggeDialogVisible: false,
      zhanshiDialogVisible: false,
      wanggezhangDialogVisible: false,
      zhuanzhiwanggeyuanDialogVisible: false,
      jianzhiweiwanggeyuanDialogVisible: false,
      wanggezhidaoyuanDialogVisible: false,
      wuseData: [],
      houseHold: [],
    };
  },
  methods: {
    async wuseHandle(type) {
      const params = {
        houseHold: type,
        pageIndex: 1,
        pageSize: 500,
      };
      this.$message({
        showClose: true,
        message: "加载中，请稍等",
        type: "success",
      });
      await Init(params).then((res) => {
        this.wuseData = res.content;
      });
      this.wuseguanliDialogVisible = true;
    },
    open() {
      const body = document.querySelector("body");
      body.setAttribute("style", "overflow:hidden;");
    },
    close() {
      const body = document.querySelector("body");
      body.removeAttribute("style", "overflow:hidden;");
    },
  },
};
</script>

<style  lang="scss" scoped>
div,
span {
  cursor: pointer;
}
* {
  box-sizing: border-box;
}
.content {
  padding: 20px;
  .heard {
    text-align: center;
    line-height: 113px;
    height: 113px;
    background: linear-gradient(0deg, #0b0f67, #141ac0);
    h1 {
      color: aliceblue;
    }
  }
  // 第一格
  .top {
    margin: 11px 0;
    height: 215px;

    display: flex;
    .top_left {
      text-align: center;
      // line-height: 215px;
      writing-mode: vertical-rl;
      border-radius: 7px;
      width: 117px;
      background-color: #19448e;
      margin-right: 20px;
      font-size: 25px;
      color: #ffff;
    }
    .top_rigth {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: space-around;
      flex-direction: column;
    }
    .top_rigth .one {
      height: 50%;
      display: flex;
      justify-content: space-around;
      :nth-child(1) {
        border-radius: 7px;
        background-color: #829ec7;
        margin-right: 20px;
      }
      :nth-child(2) {
        border-radius: 7px;
        background-color: #a0bfed;
        margin-right: 20px;
      }
      :nth-child(3) {
        border-radius: 7px;
        background-color: #a0bfed;
      }

      span {
        text-align: center;
        flex: 1;
        height: 100%;
        line-height: 107px;
      }
    }
    .top_rigth .two {
      margin-top: 10px;
      text-align: center;
      line-height: 107px;
      height: 50%;
      background-color: #34a472;
      font-size: 35px;
      color: #fff;
      border-radius: 7px;
    }
  }
  // 第二格
  .second {
    display: flex;
    justify-content: space-between;
    .rigth {
      flex: 1;
      .zhidubaozhang {
        font-size: 25px;
        text-align: center;
        line-height: 109px;
        height: 109px;
        background: #b18dcb;
        border-radius: 7px;
        margin-bottom: 10px;
      }
      .neirong {
        display: flex;
        justify-content: space-between;
        div {
          padding-top: 300px;
          height: 907px;
          flex: 1;
          background: #d1bcdd;
          border-radius: 7px;
          font-size: 25px;
          display: flex;
          justify-content: center;
          align-content: center;
          span {
            writing-mode: vertical-rl;
          }
        }
      }
    }
    .left {
      flex: 1;

      .one {
        display: flex;
        height: 197px;
        border-radius: 7px;
        margin-bottom: 20px;
        .one_left {
          text-align: center;
          // line-height: 215px;
          writing-mode: vertical-rl;
          border-radius: 7px;
          width: 117px;
          background: #c6a15d;
          font-size: 25px;
          color: #ffff;
          height: 100%;
          margin-right: 20px;
        }
        .one_rigth {
          padding: 0 0px 20px 5px;
          border: 5px dashed #fed699;
          border-radius: 7px;
          flex-direction: column;
          // flex: 1;
          // margin: 2px;
          display: flex;
          justify-content: space-between;
          margin-right: 10px;
          .top {
            height: 100px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            span {
              text-align: center;
              flex: 1;
              background: #fed699;
              border-radius: 7px;
              font-size: 25px;
            }
          }
          .button {
            height: 90px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            span {
              line-height: 69px;
              text-align: center;
              width: 190px;
              flex: 1;
              background: #18a1df;
              margin-bottom: 10px;
              font-size: 25px;
            }
          }
        }
      }
      .two {
        height: 388px;
        border-radius: 7px;
        margin-bottom: 20px;
        display: flex;
        flex: 1;

        .two_left {
          height: 100%;
          width: 117px;
          background: #a02d12;
          border-radius: 7px;
          font-size: 25px;
          text-align: center;
          padding-top: 125px;
          span {
            writing-mode: vertical-rl;
            color: #fff;
          }
          margin-right: 20px;
        }

        .two_rigth {
          flex: 1;
          display: flex;
          margin-right: 10px;
          .nameinfo {
            height: 100%;
            width: 117px;
            background: #cc8e7f;
            border-radius: 7px;
            font-size: 25px;
            text-align: center;
            padding-top: 125px;
            margin-right: 10px;
            span {
              writing-mode: vertical-rl;
              color: black;
            }
          }
          .changbei {
            flex: 1;

            .navbox {
              font-size: 25px;
              height: 100px;
              background-color: #686b9b;
              line-height: 100px;
              text-align: center;
              background: #fed699;
              border-radius: 7px;
              margin-bottom: 10px;
            }
            .buttonbox {
              height: 278px;
              display: flex;
              justify-content: space-around;
              div {
                border-radius: 7px;
                height: 100%;
                width: 80px;
                background-color: #c6a15d;
                padding-top: 50px;
                text-align: center;
                span {
                  font-size: 25px;
                  writing-mode: vertical-rl;
                  color: black;
                }
              }
            }
          }
        }
        .two_rigth2 {
          flex: 1;
          display: flex;
          justify-content: space-between;
          .box1 {
            flex: 1;

            .zhiyuan {
              text-align: center;
              border-radius: 7px;
              height: 100px;
              background: #fcd1d4;
              margin-right: 10px;
              font-size: 25px;
              line-height: 100px;
              margin-bottom: 10px;
            }
            .contets {
              margin-right: 10px;
              height: 278px;
              display: flex;
              border-radius: 7px;
              justify-content: space-between;
              div {
                border-radius: 7px;
                flex: 1;
                background: #fcd1d4;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  font-size: 20px;

                  text-align: center;
                }
              }
            }
          }
        }
      }
      .tree {
        display: flex;
        height: 388px;
        .tree_left {
          height: 100%;
          width: 117px;
          background: #7e7e7c;
          border-radius: 7px;
          font-size: 25px;
          text-align: center;
          padding-top: 125px;
          span {
            writing-mode: vertical-rl;
            color: #fff;
          }
          margin-right: 20px;
        }
        .tree_rigth {
          flex: 1;
          display: flex;
          // margin-right: 10px;
          .nameinfo {
            height: 100%;
            width: 117px;
            background: #cc8e7f;
            border-radius: 7px;
            font-size: 25px;
            text-align: center;
            padding-top: 125px;
            margin-right: 10px;
            span {
              writing-mode: vertical-rl;
              color: black;
            }
          }
          .tabel {
            flex: 1;

            display: flex;
            .tableleft {
              flex: 1;
              display: flex;
              .wangge {
                margin-right: 10px;
                height: 100%;
                width: 117px;
                background: #fed699;
                border-radius: 7px;
                font-size: 25px;
                text-align: center;
                padding-top: 125px;
                span {
                  writing-mode: vertical-rl;
                  color: rgb(0, 0, 0);
                }
              }
              .big {
                font-size: 25px;
                margin-right: 10px;
                border-radius: 7px;
                flex: 1;
                background-color: #a0bfed;
                display: flex;
                justify-content: center;
                align-items: center;
                span {
                  font-size: 20px;
                  width: 120px;
                  height: 100px;
                }
              }
            }
            .tablerigth {
              flex: 1;
              display: flex;
              justify-content: space-between;
            }
            .one {
              font-size: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              text-align: center;
              border-radius: 7px;
              margin-right: 10px;
              flex: 25%;
              background: #fcd1d4;
            }
            .two {
              font-size: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 7px;
              margin-right: 10px;
              flex: 25%;
              background: #fcd1d4;
            }
            .tree {
              font-size: 20px;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 7px;
              margin-right: 10px;
              flex: 50%;
              background: #fcd1d4;
            }
          }
        }
      }
    }
  }
}
</style>

