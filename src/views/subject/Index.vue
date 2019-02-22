<template>
<div class="subject-index">
    <div class="header">
        <tag-filter
            :value="currentFilter"
            :list="filterList"
            class="filter"
            @on-change="filterClickHander"
            >
        </tag-filter>
        <div class="options">
            <ButtonGroup>
                <Button 
                    type="success"
                    @click="createSubjectHander"
                    >
                    创建一个新主题
                </Button>
                <Button 
                    @click="viewMySubjectsHander"
                    >
                    我创建的主题
                </Button>
            </ButtonGroup>
        </div>
    </div>
    <div class="subject-list">
        <subject-card
            v-for="subject in subjects"
            :key="subject.name"
            :title="subject.name"
            :description="subject.description"
            :creator="subject.creator"
            class="subject-item"
            @on-view-subject="onViewSubjectHandler(subject)"
            @on-toggle-star="onToggleStarHandler(subject)"
            @on-view-creator="onViewCreatorHandler(subject)"
            >
        </subject-card>
    </div>
</div>
</template>

<script>
import gql from "graphql-tag";
import SubjectCard from '../../components/SubjectCard'
import TagFilter from '../../components/TagFilter'
export default {
    components: {
        SubjectCard,
        TagFilter,
    },
    data() {
        return {
            subjects: [],
            filterList: [
                {
                    id: 'hot',
                    name: '热门',
                }, {
                    id: 'all',
                    name: '全部',
                }, {
                    id: 'star',
                    name: '我的关注',
                },
            ],
        }
    },
    computed: {
        currentFilter() {
            return this.$route.query.tag
        },
    },
    beforeRouteEnter(to, from, next) {
        to.query.tag = to.query.tag || 'hot'
        next()
    },
    methods: {
        onViewSubjectHandler(subject) {
            // let routeData = this.$router.resolve({name: 'subject', params: {name: subject.name}});
            // window.open(routeData.href, '_blank');
            this.$router.push({name: 'subject', params: {name: subject.name}})
        },
        onToggleStarHandler(subject) {
        },
        onViewCreatorHandler(subject) {
            const { name, email } = subject.creator
        },
        filterClickHander(tagId) {
            this.$router.push({name: 'subjects', query: {tag: tagId}})
        },
        createSubjectHander() {
            this.$router.push({name: 'createSubject'})
        },
        viewMySubjectsHander() {
        },
    },
    apollo: {
        subjects: {
            query: gql`
                query {
                    subjects {
                        name
                        description
                        creator {
                            name
                            email
                        }
                    }
                }
            `
        }
    },

}
</script>

<style lang="less" scoped>
.subject-index {
    .header {
        display: flex;
        // .filter {

        // }
        .options {
            margin-left: auto;
        }
    }
    .subject-list {
        display: flex;
        flex-wrap: wrap;
        .subject-item {
            width: 264px;
            height: 155px;
            margin: 16px 16px 0 0;
        }
    }
}
</style>

