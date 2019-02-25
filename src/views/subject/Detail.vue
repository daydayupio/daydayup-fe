<template>
<div class="subject-detail">
    <div class="topics-section">
        <Breadcrumb
            class="breadcrumb"
            >
            <BreadcrumbItem to="/subjects">知识库</BreadcrumbItem>
            <BreadcrumbItem>{{ subjectName }}</BreadcrumbItem>
        </Breadcrumb>
        <Divider></Divider>
        <div class="header">
            <tag-filter
                :value="currentFilter"
                :list="tagFilterList"
                @on-change="filterClickHander"
                ></tag-filter>

            <div class="options">
                <ButtonGroup>
                    <Button
                        type="success"
                        @click="createTopicHandler"
                        >
                        创建一个新话题
                    </Button>
                </ButtonGroup>
            </div>

        </div>
        <div class="topic-list">
            <topic-card
                v-for="topic in topics"
                :key="topic.id"
                :views="topic.views"
                :stars="topic.stars"
                :opinions="topic.opinions"
                :title="topic.title"
                :updated-at="new Date(topic.createdAt)"
                class="topic-item"
                @on-view-topic="viewTopicHandler(topic)"
                >
            </topic-card>
        </div>
    </div>
    <!-- <div class="subject-section">
    </div> -->
</div>
</template>

<script>
import gql from 'graphql-tag'
import TagFilter from '../../components/TagFilter'
import TopicCard from '../../components/TopicCard'
export default {
    components: {
        TagFilter,
        TopicCard,
    },
    data() {
        return {
            topics: [],
            tagFilterList: [
                {
                    id: 'hot',
                    name: '最热',
                },
                {
                    id: 'all',
                    name: '全部',
                },
                {
                    id: 'star',
                    name: '我的关注',
                }
            ]
        }
    },
    computed: {
        currentFilter() {
            return this.$route.query.tag
        },
        subjectName() {
            return this.$route.params.name
        }
    },
    beforeRouteEnter(to, from, next) {
        to.query.tag = to.query.tag || 'hot'
        next()
    },
    methods: {
        filterClickHander(tagId) {
            this.$router.push({name: 'subject', query: {tag: tagId}})
        },
        viewTopicHandler(topic) {
            this.$router.push({name: 'topic', params: {subjectName: this.subjectName, id: topic.id}})
        },
        createTopicHandler() {
            this.$router.push({name: 'createTopic', params: {subjectName: this.subjectName}})
        }
    },
    created() {
        debugger
    },
    apollo: {
        topics: {
            query: gql`
                query queryTopics($subjectName: String) {
                    topics(subjectName: $subjectName) {
                        id
                        title
                        votes,
                        views,
                        stars,
                        description
                        createdAt,
                        creator {
                            name
                        }
                        subject {
                            name
                        }
                    }
                }
            `,
            variables() {
                return {
                    subjectName: this.subjectName
                }
            }
        }
    }
}
</script>

<style lang="less" scoped>
.subject-detail {
    display: flex;
    height: 100%;
    .topics-section {
        flex: 1;
        .header {
            display: flex;
            .options {
                margin: 0 16px 0 auto;
            }
        }
        .topic-list {
            margin-top: 16px;
            display: flex;
            flex-wrap: wrap;
            .topic-item {
                width: 100%;
                &:first-child {
                    border-top: 1px solid #e8eaec;
                }
            }
        }
    }
    .subject-section {
        width: 360px;
        border-left: 1px solid #e8eaec;
    }
}
</style>

