<template>
<div class="comp-tag-filter">
    <Button 
        v-for="tag in list"
        :key="tag.id"
        :type="tagId === tag.id ? 'primary' : 'text'"
        @click="filterClickHandler(tag)"
        >
        {{ tag.name }}
    </Button>
</div>

</template>

<script>
export default {
    props: {
        value: {
            type: [String, Object]
        },
        list: {
            type: Array,
            default: () => []
        },
        lableInValue: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        tagId() {
            if (typeof this.value === 'string') {
                return this.value
            } else {
                return this.value.id
            }
        }
    },
    methods: {
        filterClickHandler(tag) {
            if (!this.lableInValue) {
                tag = tag.id
            }
            this.$emit('input', tag)
            this.$emit('on-change', tag)
        }
    }
}
</script>
