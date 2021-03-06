/*
* Generate component javascript with vuejs Copyright © beetlex.io 2019-2020 email:admin@beetlex.io 
*/
var __windowsbar=""+ '<div class="windows_bar" :style="{left:(fullStatus==\'max\'?\'70px\':\'270px\')}">'+ '<ul class="nav nav-tabs" style="display:flex" id="windowsbar">'+ '<li v-for="item in items" role="presentation" :class="[select==item.id?\'active\':\'\']" :title="item.title">'+ '<a href="javascript:void(0)" @click="$open(item.id,item.title,item.model,item.data)" :title="item.title">'+ '<span :style="{maxWidth:(select==item.id?(selectWidth+\'px\'):(maxWidth+\'px\'))}">{{item.title}}</span>'+ '</a>'+ '<img v-if="item.id!=\'home\'" @click="OnClose(item)" src="/images/tabclose.png" />'+ '</li>'+ '</ul>'+ '</div>';
    Vue.component('windows_bar', {
        props: ['windows', 'full', 'selectwindow'],
        data: function () {
            return {
                fullStatus: this.full,
                items: this.windows || [],
                select: this.selectwindow,
                maxWidth: 100,
                selectWidth:300,
            }
        },
        watch: {
            full(val) {
                this.fullStatus = val;
            },
            windows(val) {
                this.items = val;
                this.onResize();
            },
            selectwindow(val) {
                this.select = val;
                this.onResize();
            },
        },
        methods: {
            OnClose: function (e) {
                this.$emit('close', e);
            },
            GetSelectWidth: function (str) {
                var len = 0;
                for (var i = 0; i < str.length; i++) {
                    var c = str.charCodeAt(i);
                    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                        len++;
                    }
                    else {
                        len += 2;
                    }
                }
                return len;  
            }
            ,
            onResize: function () {
                this.selectWidth = 50;
                var that = this;
                this.items.forEach(function (v) {
                    if (that.select == v.id) {
                        that.selectWidth = that.GetSelectWidth(v.title) * 8;
                    }
                });
                var width = document.getElementById('windowsbar').clientWidth - this.selectWidth - 48 * (this.items.length - 1)-20;
                if (this.items.length > 1) {
                    this.maxWidth = width / (this.items.length - 1);
                    if (this.maxWidth < 20)
                        this.maxWidth == 20;
                }
                else {
                    this.maxWidth = 300;
                }
            },
        },
        template: __windowsbar,
        mounted: function () {

        }
    });
