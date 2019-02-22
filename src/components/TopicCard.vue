<template>
<div class="comp-topic-card">
    <div class="statistic">
        <div class="status square">
            <span>{{ opinions }}</span>
            <span class="text">观点</span>
        </div>
        <div class="views square">
            <span>{{ views }}</span>
            <span class="text">浏览</span>
        </div>
    </div>
    <div class="summary">
        <h3 
            class="title g-color-primary"
            @click="titleClickHandler"
            >{{ title }}</h3>
        <div class="meta">
            {{ updatedAt | dateFormat }}
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'
export default {
    props: {
        stars: {
            type: Number,
            default: 0,
        },
        opinions: {
            type: Number,
            default: 0,
        },
        views: {
            type: Number,
            default: 0,
        },
        title: {
            type: String,
        },
        updatedAt: {
            type: Date,
        },
    },
    filters: {
        dateFormat(dateString) {
            return moment(dateString).fromNow()
            // .format('YYYY-MM-DD HH:mm')
        }
    },
    methods: {
        titleClickHandler() {
            this.$emit('on-view-topic')
        }
    }
}
</script>

<style lang="less" scoped>
.comp-topic-card {
    display: flex;
    height: 72px;
    align-items: center;
    border-bottom: 1px solid #e8eaec;
    padding: 16px;
    .statistic {
        display: flex;
        .square {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 58px;
            height: 52px;
            border: 1px solid #e8eaec;
            margin-right: 16px;
            .text {
                color: #ccc;
            }
        }
    }
    .summary {
        flex: 1;
        display: flex;
        flex-direction: column;
        .title {
            font-size: 16px;
            cursor: pointer;
        }
        .meta {
            margin-left: auto;
        }
    }
}

</style>


