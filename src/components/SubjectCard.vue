<template>
<div class="comp-subject-card">
    <div class="header">
        <img 
            :src="icon" 
            class="icon"
            alt="icon"
            @click="titleClickHandler"
            >
        <span
            class="title g-color-primary"
            @click="titleClickHandler"
            >
            {{ title }}
        </span>
    </div>
    <div class="body">
        {{ description }}
    </div>
    <div class="footer">
        <div 
            class="footer-item"
            @click="starClickHandler"
            >
            <Icon 
                class="icon"
                type="md-star" />
            <span 
                class="info"
                >
                {{ stars }}
            </span>
        </div>
        <div 
            class="footer-item creator"
            @click="creatorClickHandler"
            >
            <Icon 
                class="icon"
                type="md-person" />
            <span 
                class="info"
                >
                {{ creator.name }}
            </span>
        </div>
    </div>
</div>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            default: require('../assets/app.svg')
        },
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        stars: {
            type: Number,
            default: 0,
        },
        creator: {
            type: Object,
            default: () => ({
                name: '***',
                eamil: '***',
            })
        }
    },
    methods: {
        titleClickHandler() {
            this.$emit('on-view-subject')
        },
        starClickHandler() {
            this.$emit('on-toggle-star')
        },
        creatorClickHandler() {
            this.$emit('on-view-creator')
        },
    }
}
</script>

<style lang="less" scoped>
.comp-subject-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    padding: 16px;
    .header {
        display: flex;
        overflow: hidden;
        .icon {
            cursor: pointer;
        }
        .title {
            margin-left: 4px;
            font-size: 16px;
            cursor: pointer;
        }
    }
    .body {
        flex: 1;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;
        padding: 8px 0;
        font-size: 14px;
        line-height: 21px;
    }
    .footer {
        display: flex;
        .footer-item {
            height: 100%;
            display: inline-flex;
            align-items: center;
            color: #4E565E;
            cursor: pointer;
            .icon {
                font-size: 16px;
                position: relative;
                top: -1px;
            }
            .info {
                margin-left: 2px;
            }
        }
        .creator {
            justify-self: flex-end;
            margin-left: auto;
        }
    }
}
</style>


